# ATM interview task

Project completed as part of a recruitment assignment prepared by Mr Oleg, senior developer at the company where I am applying for the position.

Application specification available [here](https://docs.google.com/document/d/1DzEaB2TwEpjz4fq1CHLWIwLfyGX2dUAygZStw8H5LFg/edit?tab=t.0).

## How to run locally

1. Open any terminal and enter:

```bash
git clone https://github.com/gentlemil/atm.git
```

then open project in your IDE and run locally:

```bash
code ./atm
code .

npm i
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## API Documentation

1. First method `https://cms.stage.revelator-internal.com/items/interview_auth` returns a token object, which is stored in the localStorage. Using the interceptor, the token is added to each request with Heders `Authorization: Bearer {token}`.

```bash
{
  "data": [
    {
      "id": 1,
      "token": "LpyaO-CXM9Tnc1yGZGXa_4MrkAB40ai0",
      "message": "Follow the White Rabbit"
    }
  ]
}
```

2. The second method `https://cms.stage.revelator-internal.com/items/interview_user`, on the other hand, returns an object with the user's logged-in data, thanks to which we get information about the card owner, the available funds on the account or the last time the user logged into the system.

```bash
{
    "data": [
        {
            "id": 1,
            "first_name": "Thomas",
            "last_name": "Anderson",
            "date_of_birth": "1971-03-11",
            "gender": "Male",
            "phone_number": "+1-212-555-0347",
            "email_address": "thomas.anderson@metacortex.com",
            "account_balance": "1523.50",
            "account_status": "Active",
            "date_opened": "1998-06-01",
            "card_number": "4024 0071 8420 1305",
            "card_type": "Debit",
            "card_issuer": "Visa",
            "expiration_date": "2001-12",
            "card_status": "Active",
            "last_login": "1999-03-30T23:05:00Z"
        }
    ]
}
```

If no `token` is added to the request Headers, the server will return an error, which looks like below and and they are handled `(authInterceptor)` and displayed in the developer console and in toast message.

```bash
{
  "errors": [
    {
      "message": "You don't have permission to access this.",
      "extensions": {
        "code": "FORBIDDEN"
      }
    }
  ]
}
```

## Folders structure

```js
/src
  /app
    /core
      /guards
      /helpers
      /interceptors
      /models
      /services
    /pages
      /_layout
      /balance
      /dashboard
      /landing-page
      /login
      /withdraw
      routes.ts
    /shared
      /components
      /directives
      /pipes
    app.component.ts
    app.component.html
    app.component.sass
    app.config.ts
    app.routes.ts
  /assets
    /images
    /icons
  /environments
    environment.ts
    environment.local.ts
  main.ts
  styles.sass
  angular.json
  package.json
  tsconfig.json
```

## Additional information

1. All routes are protected by `AuthGuard` which checks if user is logged-in (if we have access to the accessToken from localStorage). If not, he's redirected to login page. Check `auth.guard.ts`

2. I prepared 3 custom validators: first of them check if pinCode is entered correctly (4 digits, no letters and special characters). Second and third validators for cash withdrawal, checking if the entered amount is not higher than the available balance and if the format is correct (max. 2 decimal places). Check `validators.ts`

3. I have also implemented a service responsible for blocking the login screen for 5 seconds if the user enters the wrong pin three times. Check `pin-auth.service.ts`.

4. I also created my own decorator to check if the value entered into the input consists of digits only. Check `only-numbers.directive.ts`

## Things to improve

Certainly, the application is not perfect and could provide a better user experience and code performance. My ideas for improving the app:

- Adding `SSR`,
- Adding a `Loading Spinner` and `Skeletons` in case data loading takes more time,
- Improving the `UI` and `SASS files` by separating into separate `_variables.sass` files and creating appropriate `mixins` and `functions` and `animations`.

## How to build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 19.0.4.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
