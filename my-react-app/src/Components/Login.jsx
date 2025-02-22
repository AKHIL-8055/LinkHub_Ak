import { useState, useEffect } from "react";
import styles from "./Login.module.css"; // ✅ Correct Import

const Login = () => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const storedAgreement = localStorage.getItem("userAgreed");
        if (storedAgreement === "true") {
            setIsChecked(true);
        }
    }, []);

    const handleCheckboxChange = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        localStorage.setItem("userAgreed", newValue);
    };

    const handleGoogleLogin = () => {
        if (!isChecked) {
            alert("You must agree to the Terms & Conditions and Privacy Policy before continuing.");
            return;
        }
        // window.location.href = "http://localhost:8080/oauth2/authorization/google";
        window.location.href = "http://ec2-3-108-64-248.ap-south-1.compute.amazonaws.com:8080/oauth2/authorization/google";
    };

    return (
        <div className={styles.container}> 
        
            <div className={styles.left}>
                <video autoPlay loop muted className={styles.video}>
                    <source src="https://hrcdn.net/fcore/assets/onboarding/globe-5fdfa9a0f4.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Right Side with Login Form */}
            <div className={styles.right}>
                <h2 className={styles.title}> LinkHub</h2>
                
                <div className={styles.checkboxContainer}> {/* ✅ Use styles.checkboxContainer */}
                    <input 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={handleCheckboxChange} 
                    />
                    I agree to the 
                    <a href="/TermsAndPrivacy" rel="noopener noreferrer"> Terms & Conditions and Privacy Policy</a>.
                </div>

                <button 
                    onClick={handleGoogleLogin} 
                    disabled={!isChecked} 
                    className={styles.googleBtn}  
                >
                    <img src="googleicon.png" alt="Google" className={styles.googleIcon} />
                    Continue with Google
                </button>

                {/* Additional Message */}
                <p className={styles.notice}>
                    Kindly use your VIT-AP student email to log in. This platform is created by students and is not an official university website. Kindly review the Terms & Conditions before proceeding.
                </p>
            </div>
        </div>
    );
};

export default Login;
