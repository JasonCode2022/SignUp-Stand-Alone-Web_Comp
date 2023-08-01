import { Component, Method, Prop, State, h, EventEmitter, Event, Watch } from "@stencil/core";
// import { FETCH_API } from "../global/Fetch-API";



@Component({
    tag: 'jji-signup-comp',
    styleUrl: './signup-comp.css',

})
export class SignUpComp {



    //Emitted when the form data is successfully submitted.
    //Contains the form data as an object.
    @Event({ bubbles: true, composed: true }) formDataSubmitted: EventEmitter<{ username: string, email: string, password: string, confirmPassword: string }>;


    //Event listener for the event...specially to know the sign in link is clicked.
    @Event({ bubbles: true, composed: true }) signInLinkClick: EventEmitter<any>;
    onSignInLinkClick() {
        this.signInLinkClick.emit();
        // console.log('Sign In Button');
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


            // //Perform the API call or data storage logic here
            // try {
            //     const response = await fetch(`${FETCH_API}`, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(formData),
            //     });
            //     if (response.ok) {

            //         //Passwords match and the form data is submitted successfully
            //         //Redirect to the success page
            //         // window.location.href = '/success.html';

            //     } else {
            //         console.log(response);
            //     }
            // } catch (error) {
            //     console.error('Error submitting form:', error);
            // }

            // //Set formSubmitted to true after successful submission
            // this.formSubmitted = true;
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
                <div class="backdrop opened" onClick={this.closeSignUpComp.bind(this)}>
                </div>,

                <div class="app-content content">
                    <div class="content-overlay"></div>
                    <div class="content-wrapper">
                        <div class="content-header row">
                        </div>
                        <div class="content-body">
                            <section class="row flexbox-container">
                                <div class="col-12 d-flex align-items-center justify-content-center">
                                    <div class="col-lg-4 col-md-8 col-10 box-shadow-2 p-0">
                                        <div class="card border-grey border-lighten-3 px-2 py-2 m-0">
                                            <div class="card-header border-0">
                                                <div class="card-title text-center">
                                                    <h1>Sign Up</h1>
                                                </div>
                                                <h6 class="card-subtitle line-on-side text-muted text-center font-small-3 pt-2"><span>Create Account</span>
                                                </h6>
                                            </div>
                                            <div class="card-content">
                                                <div class="card-body">
                                                    <form class="form-horizontal form-simple" action="index.html" novalidate>
                                                        <fieldset class="form-group position-relative has-icon-left mb-3">
                                                            <input
                                                                type="text"
                                                                class="form-control form-control-lg input-lg"
                                                                id="user-name"
                                                                placeholder="User Name"
                                                                value={this.username}
                                                                onChange={(event) => this.username = (event.target as HTMLInputElement).value} />
                                                            <div class="form-control-position">
                                                                <i class="la la-user"></i>
                                                            </div>
                                                        </fieldset>
                                                        {!this.username && this.showFormError && (
                                                            <div class="text-danger">Please fill in the username.</div>
                                                        )}
                                                        <fieldset class="form-group position-relative has-icon-left mb-3">
                                                            <input
                                                                type="email"
                                                                class="form-control form-control-lg input-lg"
                                                                id="user-email"
                                                                placeholder="Your Email Address"
                                                                required
                                                                value={this.email}
                                                                onChange={(event) => this.email = (event.target as HTMLInputElement).value} />
                                                            <div class="form-control-position">
                                                                <i class="la la-envelope"></i>
                                                            </div>
                                                        </fieldset>
                                                        {!this.email && this.showFormError && (
                                                            <div class="text-danger">Please fill in the email address.</div>
                                                        )}
                                                        <fieldset class="form-group position-relative has-icon-left mb-3">
                                                            <input
                                                                type="password"
                                                                class="form-control form-control-lg input-lg"
                                                                id="user-password"
                                                                placeholder="Enter Password"
                                                                required
                                                                value={this.password}
                                                                onInput={(event) => (this.password = (event.target as HTMLInputElement).value)} />
                                                            <div class="form-control-position">
                                                                <i class="la la-key"></i>
                                                            </div>
                                                        </fieldset>
                                                        <fieldset class="form-group position-relative has-icon-left mb-1">
                                                            <input
                                                                type="password"
                                                                class="form-control form-control-lg input-lg"
                                                                id="confirm-user-password"
                                                                placeholder="Confirm Password"
                                                                required
                                                                value={this.confirmPassword}
                                                                onInput={(event) => (this.confirmPassword = (event.target as HTMLInputElement).value)} />
                                                            <div class="form-control-position">
                                                                <i class="la la-key"></i>
                                                            </div>
                                                        </fieldset>

                                                        {!this.passwordsMatch && this.showFormError && (
                                                            <div class="text-danger">Passwords do not match.</div>
                                                        )}
                                                        <button
                                                            type="submit"
                                                            class="btn btn-info btn-lg btn-block"
                                                            onClick={(event) => this.handleCreateAccountClick(event)}>
                                                            <i class="ft-unlock"></i> Register</button>
                                                    </form>
                                                </div>
                                                <p class="text-center">
                                                    Already have an account ?
                                                    <a
                                                        class="card-link"
                                                        onClick={this.onSignInLinkClick.bind(this)}>
                                                        Login
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
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