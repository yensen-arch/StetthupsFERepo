"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SlidingCard from "../components/SlidingCard.tsx";
import StetthupsLogo from "../assets/stetthupsLogo.png";
import StetthUpsText from "../assets/stetthUpsText.png";
import LoginCard from "../components/LoginCard.tsx";
import { SignUp1 } from "../components/SignUp1.tsx";
import { SignUp2 } from "../components/SignUp2.tsx";
import { SignUp3 } from "../components/SignUp3.tsx";
import { SignUp4 } from "../components/SignUp4.tsx";
import { SignUp5 } from "../components/SignUp5.tsx";
import TermsModal from "../components/TermsModal.js";
import axios from "axios";
import { toast } from "react-hot-toast";
import LoginWithPhone from "../components/LoginWithPhone.tsx";

export default function LoginPage() {
  const [currentComponent, setCurrentComponent] = useState("login");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    State: "",
    City: "",
    CollegeName: "",
    CurrentYear: "",
  });

  useEffect(() => {
    const checkMobileAndToken = () => {
      const mobileWidth = window.innerWidth <= 1080;
      setIsMobile(mobileWidth);
      const accessToken = localStorage.getItem("access_Token");

      if (mobileWidth && !accessToken) {
        setShowTermsModal(true);
      } else {
        setShowTermsModal(false);
      }
    };

    checkMobileAndToken();
    window.addEventListener("resize", checkMobileAndToken);

    return () => {
      window.removeEventListener("resize", checkMobileAndToken);
    };
  }, []);

  const handleInputChange = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSignUp1Back = () => {
    setCurrentComponent("login");
  };

  const handleLoginNext = () => {
    setCurrentComponent("signup1");
  };

  const throughPhone = () => {
    setCurrentComponent("throughPhone");
  };

  const handleSignUp1Next = () => {
    setCurrentComponent("signup2");
  };

  const handleSignUp2Next = () => {
    setCurrentComponent("signup3");
  };

  const handleSignUp3Next = () => {
    setCurrentComponent("signup4");
  };

  const handleSignUp4Next = () => {
    setCurrentComponent("signup5");
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-gradient-to-r from-white to-purple-200">
      {showTermsModal && <TermsModal />}
      {/* Left Side */}
      {!isMobile && (
        <div className="hidden w-1/2 lg:flex lg:flex-col lg:justify-center lg:items-center text-white">
          <div className="hidden w-1/2 lg:flex lg:flex-col lg:justify-center lg:items-center text-white">
            <img
              src={StetthupsLogo}
              alt="Stethups Logo"
              className="w-60 h-60 mb-8"
            />
            <img
              src={StetthUpsText}
              alt="Stetthups Text"
              className="w-60 mb-8"
            />
            <SlidingCard />
          </div>{" "}
        </div>
      )}
      {/* Right Side */}
      <div className="flex items-center min-h-screen justify-center mx-auto">
        {currentComponent === "login" && (
          <LoginCard onNext={handleLoginNext} throughPhone={throughPhone} />
        )}
        {currentComponent === "throughPhone" && (
          <LoginWithPhone onNext={handleSignUp1Back} />
        )}
        {currentComponent === "signup1" && (
          <SignUp1
            onNext={handleSignUp1Next}
            onInputChange={handleInputChange}
            formData={formData}
            onBack={handleSignUp1Back}
          />
        )}
        {currentComponent === "signup2" && (
          <SignUp2
            onBack={handleLoginNext}
            onNext={handleSignUp2Next}
            onInputChange={handleInputChange}
            formData={formData}
          />
        )}
        {currentComponent === "signup3" && (
          <SignUp3
            onBack={handleSignUp1Next}
            onNext={handleSignUp4Next}
            onInputChange={handleInputChange}
            formData={formData}
          />
        )}
        {currentComponent === "signup4" && (
          <SignUp4 onNext={handleSignUp4Next} />
        )}
        {currentComponent === "signup5" && (
          <SignUp5
            onBack={handleSignUp3Next}
            phoneNumber={formData.PhoneNumber}
            formData={formData}
          />
        )}
      </div>
    </div>
  );
}
