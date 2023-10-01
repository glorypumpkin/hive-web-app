

export default function RegistrationForm() {
    return (

        <div
            id="RegistrationFormRoot"
            className="shadow-[0px_0px_15px_3px_rgba(0,_0,_0,_0.12)] overflow-hidden bg-[#f2e7d0] flex flex-col justify-end gap-2 w-[530px] h-[700px] px-px py-4 rounded-[50px]"
        >
            <h2 className="text-3xl font-bold self-start mb-8 ml-12">
                Welcome! Let's start!
            </h2>
            <div className="input-container">
                <h5 className="small-header">Full name</h5>
                <input
                    id="NameInput"
                    className="reg-form-input"
                    placeholder="Enter your full name"
                    required={true}
                >
                </input>
            </div>
            <div className="input-container">
                <h5 className="small-header">Email address</h5>
                <input className="reg-form-input"
                    placeholder="Enter your email address"
                    required={true}
                >
                </input>
            </div>
            <div className="input-container">
                <h5 className="small-header">Password</h5>
                <input className="reg-form-input"
                    placeholder="Must have at least 8 characters"
                    required={true}
                    minLength={8}
                >

                </input>
            </div>
            <button
                id="SignUpButton"
                className="overflow-hidden bg-[rgba(95,_23,_23,_0.45)] self-center flex flex-col justify-center w-3/5 h-12 shrink-0 items-center rounded-lg text-xl font-bold text-white"
            >
                Sign Up
            </button>
            <div className="text-sm font-semibold self-center mb-3">
                Already have an account?
                <div className="text-[rgba(95,_23,_23,_0.45)] contents"> </div>
                <div className="font-black text-[rgba(95,_23,_23,_0.45)] contents">
                    Log in!
                </div>
            </div>  {/*TODO: fix this text*/}
            <div className="flex flex-row justify-between items-center mb-4 mr-px">
                <div
                    id="Line"
                    className="line"
                />
                <div className="text-xl font-semibold self-start">OR</div>
                <div
                    id="Line1"
                    className="line"
                />
            </div>
            <button
                id="SignInGoogleButton"
                className="overflow-hidden bg-white self-center flex flex-row justify-center gap-3 w-3/5 items-center rounded-lg text-xl font-semibold"
            >
                <img
                    src="https://file.rendit.io/n/YKkPmmUJdJZpxjFKwawI.svg"
                    id="Iconsgoogle"
                    className="w-12 shrink-0 my-1"
                />
                Sign in with Google
            </button>
        </div>
    )
}
