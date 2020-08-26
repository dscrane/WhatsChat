#### First Time Users
        ***
        - As a first time user I will be greeted by sign up page with a form to fill out
            - formState: formData (local)
        - The form allow me to enter my first and last name along with a username, email and password in order to register as a user

        - After the initial sign up process succeeds I will be greeted with a profile page with place for favorite chats CTA
            - there will be one inital favorite chat room that all users are added to when the create an account
            - userState { authenticated, {attributes}, token }
            - roomsState [publicChat, ...]
        - If the sign up process fails I will be rerouted to the initial landing page with an error message describing what has gone wrong
        - I will see that some chat rooms are private and need an invitation to join the room while others are open to the public


        #### Returning Users
        ***
        - As a returning user I will be greeted by the sign up page but will be able to click over to the login page
        - the login page will prompt me to enter my username and password
        - if the authentication process fails I will be returned to the login page with an error message with what has gone wrong
        - if the authentication process is successful I will be taken to my profile page

        - My profile page will show information about myself that I can change (like my user name, age, interests, avatar)
        - the profile will also show a list of favorite chat rooms for quicker access
        - any private chat rooms that have been added to favorites will no longer need the password to enter (provided the room owner has not changed it)
        - there will also be a list of chat rooms that I have created, so I can moderate if necessary


        #### All Users
        ***
        - I will be able to click on a public room and be added to the group
        - When I first join the system will send a message to the other users letting them know a new user has entered
        - I will see a message if another user leaves the group

        - I click a back button that will allow me to leave the group and return to the chat room page
        - When I leave the group the remaining users will see a message that I have left

        - If I click on a private room I will be prompted to enter the password
        - If the password is incorrect I will get an error message below the input
        - If the password is correct I will join the private room and other users will get a message that I have joined
