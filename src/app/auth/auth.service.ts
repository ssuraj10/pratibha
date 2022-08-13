import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;
    private messageSource = new BehaviorSubject('');
    currentMessage = this.messageSource.asObservable();
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }




    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    //  user/verify
    signIn(credentials: { username: string, password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }
        const headers = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');


        return this._httpClient.post(environment.Main_API + '/auth.php',credentials, { 'headers': headers }).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                // this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                // localStorage.setItem('username', credentials.username);
                // this.messageSource.next(credentials.username)
                // Store the user on the user service
                // this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);

            })
        );
    }



    /**
     * Sign in using the access token
     */


    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('offsetSeconds');
        localStorage.removeItem('username');
        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(credentials): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(environment.Main_API + '/register.php', credentials).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                // this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                // localStorage.setItem('username', credentials.username);
                // this.messageSource.next(credentials.username)
                // Store the user on the user service
                // this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);

            })
        );
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in

        // Check the access token availability
        if (!this.accessToken) {

            return of(false);


        }
        // if (AuthUtils.isTokenExpired(this.refreshToken, Number(this.offsetSeconds))) {
        //     return of(false);
        // }

        // if (!this.accessToken) {
        //     if (this.refreshToken) {
        //         return this.signInUsingToken();
        //     }

        // }
        if (this.accessToken) {

            this._authenticated = true;


        }

        return of(true);
    }



    ChangePassword(data: any) {
        return this._httpClient
            .post<any>(environment.Main_API + `security/user/changepassword`, data)
            .pipe(
        );
    }


}
