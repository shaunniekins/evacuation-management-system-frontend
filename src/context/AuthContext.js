import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { position } from "@chakra-ui/system";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [userExist, setUserExist] = useState(false);
  const [userUserName, setUserUserName] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMunicipality, setUserMunicipality] = useState("");
  const [userBarangay, setUserBarangay] = useState("");
  const [userPosition, setUserPosition] = useState("");
  const [userContactNum, setUserContactNum] = useState("");
  const [userImage, setUserImage] = useState(null);

  const history = useHistory();

  const loginUser = (
    formData,
    password,
    username,
    first_name,
    last_name,
    email,
    municipality,
    barangay,
    position,
    contact_number,
    image
  ) => {
    if (formData.username === username && formData.password === password) {
      setUserExist(true);
      setUserUserName(username);
      setUserName(`${first_name} ${last_name}`);
      setUserEmail(email);
      setUserMunicipality(municipality);
      setUserBarangay(barangay);
      setUserPosition(position);
      setUserContactNum(contact_number);
      setUserImage(image);
      // localStorage.setItem("userExist", true);
      // Store the user's login information in local storage
      localStorage.setItem("userExist", true);
      localStorage.setItem("userName", `${first_name} ${last_name}`);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userMunicipality", municipality);
      localStorage.setItem("userBarangay", barangay);
      localStorage.setItem("userPosition", position);
      localStorage.setItem("userContactNum", contact_number);
      localStorage.setItem("userImage", image);
      history.push("/admin");
    }
  };
  useEffect(() => {
    const userExists = JSON.parse(localStorage.getItem("userExist"));
    if (userExists) {
      setUserExist(true);
      setUserUserName(localStorage.getItem("userUserName"));
      setUserName(localStorage.getItem("userName"));
      setUserEmail(localStorage.getItem("userEmail"));
      setUserMunicipality(localStorage.getItem("userMunicipality"));
      setUserBarangay(localStorage.getItem("userBarangay"));
      setUserPosition(localStorage.getItem("userPosition"));
      setUserContactNum(localStorage.getItem("userContactNum"));
      setUserImage(localStorage.getItem("userImage"));
    }
  }, []);

  const logoutUser = () => {
    // setAuthTokens(null);
    setUserExist(false);
    setUserUserName("");
    setUserName("");
    setUserEmail("");
    setUserMunicipality("");
    setUserBarangay("");
    setUserPosition("");
    setUserContactNum("");
    setUserImage(null);
    // Remove the user's login information from local storage
    localStorage.removeItem("userExist", false);
    localStorage.removeItem("userUserName");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userMunicipality");
    localStorage.removeItem("userBarangay");
    localStorage.removeItem("userPosition");
    localStorage.removeItem("userContactNum");
    localStorage.removeItem("userImage");

    history.push("/auth/signin");
  };

  let contextData = {
    userExist,
    userUserName,
    userName,
    userEmail,
    userMunicipality,
    userBarangay,
    userPosition,
    userContactNum,
    userImage,
    loginUser,
    logoutUser,
    setUserImage,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
