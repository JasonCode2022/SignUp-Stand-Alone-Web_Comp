// //Global constant to store the API endpoint for fetching data
// export const FETCH_API = 'https://jsonplaceholder.typicode.com/posts';




                // <div>
                //     <form class="form">
                //         <div>
                //             <h1 class="signup-title" id="signup">{this.titl}</h1>
                //         </div>
                //         <div>
                //             <input
                //                 id="n"
                //                 type="text"
                //                 placeholder="Username"
                //                 title="username"
                //                 value={this.username}
                //                 onChange={(event) => this.username = (event.target as HTMLInputElement).value} />
                //         </div>
                //         <div>
                //             <input
                //                 id="e"
                //                 type="email"
                //                 placeholder="Something@hotmail.com"
                //                 title="email"
                //                 value={this.email}
                //                 onChange={(event) => this.email = (event.target as HTMLInputElement).value} />
                //         </div>
                //         <input
                //             id="p1"
                //             type="password"
                //             placeholder="Password"
                //             title="password"
                //             required
                //             value={this.password}
                //             onInput={(event) => (this.password = (event.target as HTMLInputElement).value)}
                //         />

                //         <input
                //             id="p2"
                //             type="password"
                //             placeholder="Confirm Password"
                //             title="confirm password"
                //             required
                //             value={this.confirmPassword}
                //             onInput={(event) => (this.confirmPassword = (event.target as HTMLInputElement).value)}
                //         />
                //         <div>
                //             {/* Check if showFormError is true and form has not been submitted */}
                //             {this.showFormError && !this.formSubmitted && (this.username === '' || this.email === '' || this.password === '' || this.confirmPassword === '') && (
                //                 <div>
                //                     <span id="error-message" class="error">
                //                         Please Fill All Required Fields.
                //                     </span>
                //                 </div>
                //             )}
                //             {this.passwordsMatch ? [
                //                 <div>
                //                     <button
                //                         id="create"
                //                         class="n"
                //                         onClick={(event) => this.handleCreateAccountClick(event)}>
                //                         Create Account
                //                     </button>
                //                 </div>,
                //                 <div>
                //                     <span id="sign-in-take" class="s">
                //                         Already Have An Account?
                //                         <a onClick={this.onSignInLinkClick.bind(this)}>
                //                             Sign In
                //                         </a>
                //                     </span>
                //                 </div>
                //             ] : (
                //                 <div>
                //                     <span id="error-message" class="error">
                //                         Passwords Do Not Match. Please Try Again.
                //                     </span>
                //                 </div>
                //             )}
                //         </div>
                //     </form>
                // </div>