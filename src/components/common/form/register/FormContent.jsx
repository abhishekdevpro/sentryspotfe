// import { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { userSignUp } from "@/store/slices/auth/actions";
// import ActionLoader from "@/components/loader/ActionLoader";
// const ruleNumber = /\d/;
// const ruleSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
// const ruleCapitalChar = /[A-Z]/;
// const ruleSmallChar = /[a-z]/;

// const passwordRequirements = [
//   "min one number required",
//   "min one special characters required",
//   "At least 8 characters",
//   "A mixture of both uppercase and lowercase letters",
// ];

// const FormContent = () => {
//   const dispatch = useDispatch();

//   const { loading, userInfo, userToken, error, success, message } = useSelector(
//     (state) => state.auth
//   );

//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");

//   const [hasNumber, setHasNumber] = useState(false);
//   const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
//   const [hasCapitalCharacter, setHasCapitalCharacter] = useState(false);
//   const [hasSmallCharacter, setHasSmallCharacter] = useState(false);
//   const [minCharacters, setMinCharacters] = useState(false);

//   const [passwordVisibility, setPasswordVisibility] = useState(false);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (
//       hasNumber &&
//       hasSpecialCharacter &&
//       minCharacters &&
//       hasSmallCharacter &&
//       hasCapitalCharacter
//     ) {
//       const { firstName, lastName, email, password } = e?.target?.elements;
//       console.log(
//         firstName?.value,
//         lastName?.value,
//         email?.value,
//         password?.value,
//         phone
//       );
//       dispatch(
//         userSignUp({
//           first_name: firstName?.value,
//           last_name: lastName?.value,
//           email: email?.value,
//           phone: phone,
//           password: password?.value,
//         })
//       );
//     } else toast.error("Weak Password");
//   };
//   const validate = (password) => {
//     setMinCharacters(password.length >= 8);
//     setHasNumber(ruleNumber.test(password));
//     setHasSpecialCharacter(ruleSpecialChar.test(password));
//     setHasCapitalCharacter(ruleCapitalChar.test(password));
//     setHasSmallCharacter(ruleSmallChar.test(password));
//   };
//   const checkPassword = (value) => {
//     validate(value);
//     setPassword(value);
//   };
//   return (
//     <form className="" onSubmit={submitHandler}>
//       <div className="flex gap-2">
//         <div className="form-group">
//           <label htmlFor="firstName">First name*</label>
//           <input
//             type="text"
//             name="firstName"
//             placeholder="First Name"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="lastName">Last name*</label>
//           <input type="text" name="lastName" placeholder="Last Name" required />
//         </div>
//       </div>

//       <div className="form-group">
//         <label htmlFor="email">Email Address*</label>
//         <input type="email" name="email" placeholder="Email" required />
//       </div>
//       <div className="form-group">
//         <label>Phone Number</label>
//         <PhoneInput
//           country={"us"}
//           inputProps={{
//             name: "phone",
//           }}
//           inputStyle={{
//             width: "100%",
//             // paddingTop: "20px",
//             fontSize: "14px",
//             height: "50px",
//           }}
//           value={phone}
//           onChange={(phone) => setPhone(phone)}
//         />
//       </div>
//       {/* name */}

//       <div className="form-group relative">
//         <label htmlFor="password">Password*</label>
//         <input
//           id="password-field"
//           type={passwordVisibility ? "text" : "password"}
//           name="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => {
//             if (e.target.value.length <= 16) {
//               checkPassword(e.target.value);
//             }
//           }}
//           required
//         />
//         {!passwordVisibility ? (
//           <FaEye
//             className="absolute top-[50px] right-5 cursor-pointer"
//             size={18}
//             onClick={() => setPasswordVisibility(!passwordVisibility)}
//           />
//         ) : (
//           <FaEyeSlash
//             className="absolute top-[50px] right-5 cursor-pointer"
//             size={18}
//             onClick={() => setPasswordVisibility(!passwordVisibility)}
//           />
//         )}

//         <div className="pl-3 ">
//           <p
//             className={`text-sm ${hasNumber ? "hidden" : "block text-red-600"}`}
//           >
//             {passwordRequirements[0]} {`${hasNumber}`}
//           </p>
//           <p
//             className="text-sm"
//             style={hasSpecialCharacter ? { display: "none" } : { color: "red" }}
//           >
//             {passwordRequirements[1]}
//           </p>
//           <p
//             className="text-sm"
//             style={minCharacters ? { display: "none" } : { color: "red" }}
//           >
//             {passwordRequirements[2]}
//           </p>
//           <p
//             className="text-sm"
//             style={
//               hasSmallCharacter && hasCapitalCharacter
//                 ? { display: "none" }
//                 : { color: "red" }
//             }
//           >
//             {passwordRequirements[3]}
//           </p>
//         </div>
//       </div>

//       <div className="form-group">
//         <div className="input-group checkboxess ">
//           <input type="checkbox" name="" id="" required />
//           <label htmlFor="service" className="service">
//             <span className="custom-checkbox ms-2">
//               By using our Services, you agree to our terms of use
//             </span>
//           </label>
//         </div>
//       </div>
//       {/* password */}

//       <div className="form-group">
//         <button
//           className="theme-btn btn-style-one"
//           type="submit"
//           disabled={loading}
//         >
//           {loading ? <ActionLoader /> : "Register"}
//         </button>
//       </div>

//       {/* login */}
//     </form>
//   );
// };

// export default FormContent;


import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { userSignUp } from "@/store/slices/auth/actions";
import ActionLoader from "@/components/loader/ActionLoader";

const FormContent = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = e?.target?.elements;
    dispatch(
      userSignUp({
        first_name: firstName?.value,
        last_name: lastName?.value,
        email: email?.value,
        phone: phone,
        password: password?.value,
      })
    );
  };

  return (
    <form className="" onSubmit={submitHandler}>
      <div className="flex gap-2">
        <div className="form-group">
          <label htmlFor="firstName">First name*</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last name*</label>
          <input type="text" name="lastName" placeholder="Last Name" required />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address*</label>
        <input type="email" name="email" placeholder="Email" required />
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <PhoneInput
          country={"us"}
          inputProps={{
            name: "phone",
          }}
          inputStyle={{
            width: "100%",
            fontSize: "14px",
            height: "50px",
          }}
          value={phone}
          onChange={(phone) => setPhone(phone)}
        />
      </div>

      <div className="form-group relative">
        <label htmlFor="password">Password*</label>
        <input
          id="password-field"
          type={passwordVisibility ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!passwordVisibility ? (
          <FaEye
            className="absolute top-[50px] right-5 cursor-pointer"
            size={18}
            onClick={() => setPasswordVisibility(!passwordVisibility)}
          />
        ) : (
          <FaEyeSlash
            className="absolute top-[50px] right-5 cursor-pointer"
            size={18}
            onClick={() => setPasswordVisibility(!passwordVisibility)}
          />
        )}
      </div>

      <div className="form-group">
        <div className="input-group checkboxess ">
          <input type="checkbox" name="" id="" required />
          <label htmlFor="service" className="service">
            <span className="custom-checkbox ms-2">
              By using our Services, you agree to our terms of use
            </span>
          </label>
        </div>
      </div>

      <div className="form-group">
        <button
          className="theme-btn btn-style-one"
          type="submit"
          disabled={loading}
        >
          {loading ? <ActionLoader /> : "Register"}
        </button>
      </div>
    </form>
  );
};

export default FormContent;
