import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.post("http://ec2-3-108-64-248.ap-south-1.compute.amazonaws.com:8080/logout", {}, { withCredentials: true });
        alert("Logout successful!");
        navigate("/");
      } catch (error) {
        console.error("Logout failed", error);
        alert("Logout failed. Please try again.");
      }
    };

    handleLogout();
  }, [navigate]);

  return null; // No extra button or UI needed
};

export default Logout;
