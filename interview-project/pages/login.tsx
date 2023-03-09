import { useGoogleOneTapLogin } from "@react-oauth/google";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Layout from "@/components/Layout";
// import {signIn} from "next-auth/react";

export default function SignUp() {
  function onSuccess(response) {
    alert("One Tap not implemented yet");
  }

  function onError() {
    alert("One Tap not implemented yet");
  }

  // useGoogleOneTapLogin({ onSuccess, onError });

  return (
    <div className="hero bg-base-200 flex-1">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left ml-7">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Login in to your account to get access to begin uploading images and
            segmenting them.
          </p>
        </div>

        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
              <button
                className="flex border shadow-sm border-gray-300 rounded p-2 items-center justify-center py-4"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <Image
                  src="/google.svg"
                  alt="google"
                  className="w-5 h-5 align-baseline"
                  width={60}
                  height={60}
                />
                <span className="ml-2 text-zinc-700 font-sans">
                Sign in with Google
                  </span>
              </button>
            {/*<button onClick={() => signIn("google")}>*/}
            {/*  Sign in with Google*/}
            {/*</button>*/}

            <div className="divider">OR</div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
SignUp.layout = Layout;