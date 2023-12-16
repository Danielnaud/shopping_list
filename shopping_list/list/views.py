from django.shortcuts import render, redirect
from .models import ShoppingList, ShoppingListItems, ListCount
from datetime import datetime
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

def start(request):
    return redirect("login")

def login_func(request):
    if request.user.is_authenticated:
        return redirect("list-choice")
    else:

        error_message = request.session.pop("error_message", False)

        if request.method == "POST":
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return redirect("list-choice")
            
            else:
                error_message = "Name oder Passwort ungültig"
                request.session['error_message'] = error_message
            
        return render(request, "login.html", {"error_message": error_message})

def logout_func(request):
    logout(request)

    return redirect("login")

def signup_func(request):

    error_message = request.session.pop("error_message", False)

    if request.method == "POST":
        username = request.POST['username']

        if username in User.objects.values_list('username', flat=True):
            error_message = "Name bereits vergeben"
            request.session['error_message'] = error_message

        else:
            hashed_password = make_password(request.POST['password'])
            User.objects.create(username=username, password=hashed_password)
            return redirect("login")

    return render(request, "signup.html", {"error_message": error_message})

def account(request):
    if request.user.is_authenticated:
        
        error_message = request.session.pop("error_message", False)

        if request.method == "POST":

            if request.POST['whatToDo'] == "logout":
                logout(request)

            elif request.POST['whatToDo'] == "deleteAccount":
                shopping_lists_to_delete = ShoppingList.objects.filter(owned_by=request.user.username)

                for shopping_list in shopping_lists_to_delete:
                    shopping_list.delete()

                request.user.delete()

            elif request.POST['whatToDo'] == "changeUsername":
                new_username = request.POST['newUsername']

                if (new_username in User.objects.values_list('username', flat=True)) and (new_username != request.user.username):
                    request.session['error_message'] = "username already in use"
                else:
                    user = User.objects.get(pk=request.user.id)
                    
                    shopping_lists_to_change = ShoppingList.objects.filter(owned_by=request.user.username)

                    for shopping_list in shopping_lists_to_change:
                        shopping_list.owned_by = new_username
                        shopping_list.save()

                    user.username = new_username
                    user.save()


                
        return render(request, "account.html", {"error_message": error_message})
    else:
        return redirect("login")
    
def list_choice(request):
    if request.user.is_authenticated:

        error_message = request.session.pop("error_message", False)

        if request.method == "POST":

            if request.POST['whatToDo'] == "createList":

                user_list_count = ListCount.objects.get(user=request.user.id)

                if user_list_count.list_count < 5:

                    list_name = request.POST['listName']
                    current_user = request.user
                    shopping_list = ShoppingList.objects.create(name=list_name, owned_by=current_user)
                    shopping_list.users.set([current_user])

                    user_list_count.list_count += 1
                    user_list_count.save()

                else:
                    error_message = "Du kannst nicht mehr als 5 Listen haben"

                    request.session['error_message'] = error_message

            elif request.POST['whatToDo'] == "deleteList":
                
                current_list = ShoppingList.objects.get(pk=request.POST['id'])

                if request.user.username == current_list.owned_by:
                    current_list.delete()

                    user_list_count = ListCount.objects.get(user=request.user.id)
                    user_list_count.list_count -= 1
                    user_list_count.save()
                else:
                    current_list.users.remove(request.user)
                    current_list.save()

            elif request.POST['whatToDo'] == "selectList":
                request.session['selected_list_id'] = request.POST['id']

            elif request.POST['whatToDo'] == "addUserToList":
                username = request.POST['username']

                try:
                    user = User.objects.get(username=username)
                    selected_shopping_list = ShoppingList.objects.get(pk=request.POST['listId'])
                    if user in selected_shopping_list.users.all():
                        error_message = "user hat bereits Zugriff"
                    else:
                        selected_shopping_list.users.add(user)
                        selected_shopping_list.save()

                except User.DoesNotExist:
                    error_message = "user existiert nicht"

                request.session['error_message'] = error_message

            elif request.POST['whatToDo'] == "removeUserFromList":
                current_list = ShoppingList.objects.get(pk=request.POST['listId'])

                current_list.users.remove(request.POST['userId'])
                current_list.save()

        shopping_lists = ShoppingList.objects.filter(users=request.user)
        
        return render(request, 'list_choice.html', {"shopping_lists": shopping_lists, "error_message": error_message})

    else:
        return redirect("login")

def list(request):
    if request.user.is_authenticated:

        chosen_list_id = int(request.session.get('selected_list_id'))
        current_object = ShoppingList.objects.get(pk=chosen_list_id)

        if request.method == "POST":

            if request.POST['whatToDo'] == "addItem":

                date_today = str(datetime.today())
                year, month, day_time = date_today.split("-")
                day, _ = day_time.split(" ")          
                date = f"{day}.{month}.{year}"

                ShoppingListItems.objects.create(
                    list=current_object,
                    name=request.POST['itemName'],
                    created_at=date,
                )

            elif request.POST['whatToDo'] == "deleteItem":
                
                current_item = ShoppingListItems.objects.get(pk=request.POST['id'])
                current_item.delete()

            elif request.POST['whatToDo'] == "changeCheckbox":
                
                current_item = ShoppingListItems.objects.get(pk=request.POST['id'])

                if request.POST['done'] == "True":
                    current_item.done = True
                else:
                    current_item.done = False
                
                current_item.save()

            elif request.POST['whatToDo'] == "changeQuantity":

                current_item = ShoppingListItems.objects.get(pk=request.POST['id'])

                current_item.quantity = request.POST['quantity']

                current_item.save()


        list_items = ShoppingListItems.objects.filter(list_id=chosen_list_id)

        return render(request, "list.html", {"list_items": list_items, "list_name": current_object.name})

    else:
        return redirect('login')
    