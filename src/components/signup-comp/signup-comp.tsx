import { Component, Method, Prop, State, h, EventEmitter, Event, Listen, Watch } from "@stencil/core";
import { FETCH_API } from "../global/Fetch-API";



@Component({
    tag: 'jji-signup-comp',
    styleUrl: './signup-comp.css',
    shadow: true,
})
export class SignUpComp {

    //Emitted when the form data is successfully submitted.
    //Contains the form data as an object.
    @Event() formDataSubmitted: EventEmitter<{ username: string, email: string, password: string, confirmPassword: string }>;


    //Event listener for the 'body:click' event...specially to know the sign in link is clicked.
    @Listen('body:click')
    onSignInLinkClick(_event: Event) {
        console.log('Sign In Button');
        window.location.href = '/signin.html';
    }

    @Prop({ reflect: true }) titl: string;

    //Controls the visibility of the sign-up form.
    @Prop({ reflect: true, mutable: true }) opened: boolean;


    //The user's username,e-mail,password,confirmpassword input value in the form.
    @State() username: string = '';
    @State() email: string = '';
    @State() password: string = '';
    @State() confirmPassword: string = '';


    //Indicates whether the entered passwords match.
    @State() passwordsMatch: boolean = true;

    // Error message displayed when the passwords do not match.
    @State() errorMessage: string = '';

    //Indicates whether the form has been submitted.
    @State() formSubmitted: boolean = false;

    //The initial value of the password when the form is submitted for the first time.
    //Used to track if the user corrects the password after the initial submission.
    @State() initialPassword: string = '';

    //New state variable to control the error message
    @State() showFormError: boolean = false;

    //Method to open and close the sign-up form.
    @Method()
    async openSignUpComp() {
        console.log('Sign Up Is Open');
        this.opened = true;
        this.initialPassword = '';
        // Reset the error message state when the component is opened
        this.showFormError = false;
    }
    closeSignUpComp() {
        console.log('Sign Up Is Closed');
        this.opened = false;
    }

    //Watcher to monitor changes in the password and confirm password fields.
    //It checks if the passwords have been corrected and match again.
    @Watch('password')
    @Watch('confirmPassword')
    handlePasswordChange(newValue: string) {

        //Check if the passwords have been corrected (not empty) and match again
        if (newValue !== '' && this.password === this.confirmPassword) {
            this.passwordsMatch = true;
        } else {
            this.passwordsMatch = false;
        }
    }

    handleCreateAccountClick(event: MouseEvent) {
        // Check if the form has been submitted
        if (!this.formSubmitted) {
            // Show the error message when the "Create Account" button is clicked
            this.showFormError = true;

            // Check if any required fields are empty
            if (this.username === '' || this.email === '' || this.password === '' || this.confirmPassword === '') {
                // Prevent form submission if fields are empty
                event.preventDefault();
            } else {
                // If all required fields are filled, perform form submission
                this.handleSubmit(event);
            }
        }
    }

    //Method to handle form submission
    async handleSubmit(event: Event) {
        event.preventDefault();

        //Check if passwords match
        if (this.password === this.confirmPassword) {

            //Set the initialPassword when the form is submitted for the first time
            if (this.initialPassword === '') {
                this.initialPassword = this.password;
            }
            this.passwordsMatch = true;

            //Fetch the API and send the form data
            const formData = {
                username: this.username,
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword,
            };
            console.log(formData);

            //Emit the form data through the custom event
            this.formDataSubmitted.emit(formData);

            //Perform the API call or data storage logic here
            try {
                const response = await fetch(`${FETCH_API}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    //Passwords match and the form data is submitted successfully
                    //Redirect to the success page
                    window.location.href = '/success.html';
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }

            //Set formSubmitted to true after successful submission
            this.formSubmitted = true;
        } else {
            //Passwords don't match, show an error message or take appropriate action
            this.passwordsMatch = false;

            // Do not submit the form until all fields are filled correctly
            this.formSubmitted = false;
        }
    }

    //Render method to generate the component's HTML
    render() {
        let mainContent = null;

        if (this.opened) {
            mainContent = [
                //HTML code for backdrop and form
                <div class="backdrop" onClick={this.closeSignUpComp.bind(this)}>
                </div>,
                //Form elements
                <div>
                    <form class="form">
                        <div>
                            <h1 class="signup-title" id="signup">{this.titl}</h1>
                        </div>
                        <div>
                            <input
                                id="n"
                                type="text"
                                placeholder="Username"
                                title="username"
                                value={this.username}
                                onChange={(event) => this.username = (event.target as HTMLInputElement).value} />
                        </div>
                        <div>
                            <input
                                id="e"
                                type="email"
                                placeholder="Something@hotmail.com"
                                title="email"
                                value={this.email}
                                onChange={(event) => this.email = (event.target as HTMLInputElement).value} />
                        </div>
                        <input
                            id="p1"
                            type="password"
                            placeholder="Password"
                            title="password"
                            required
                            value={this.password}
                            onInput={(event) => (this.password = (event.target as HTMLInputElement).value)}
                        />

                        <input
                            id="p2"
                            type="password"
                            placeholder="Confirm Password"
                            title="confirm password"
                            required
                            value={this.confirmPassword}
                            onInput={(event) => (this.confirmPassword = (event.target as HTMLInputElement).value)}
                        />
                        <div>
                            {/* Check if showFormError is true and form has not been submitted */}
                            {this.showFormError && !this.formSubmitted && (this.username === '' || this.email === '' || this.password === '' || this.confirmPassword === '') && (
                                <div>
                                    <span id="error-message" class="error">
                                        Please Fill All Required Fields. 
                                    </span>
                                </div>
                            )}
                            {this.passwordsMatch ? [
                                <div>
                                    <button
                                        id="create"
                                        class="n"
                                        onClick={(event) => this.handleCreateAccountClick(event)}>
                                        Create Account
                                    </button>
                                </div>,
                                <div>
                                    <span id="sign-in-take" class="s">
                                        Already Have An Account?
                                        <a onClick={(event) => this.onSignInLinkClick(event)}>
                                            Sign In
                                        </a>
                                    </span>
                                </div>
                            ] : (
                                <div>
                                    <span id="error-message" class="error">
                                        Passwords Do Not Match. Please Try Again.
                                    </span>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            ];
        }

        return (
            <div id="signup-comp">
                {mainContent}
            </div>

        )
    }
}