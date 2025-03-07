import { ChartLine, Check, Clock4, Gift, Map, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../public/logo.png";

export default function page() {
  return (
    <div className="px-4 md:px-6 lg:px-8">
      {/* First section */}
      <section className="h-90 flex items-center flex-col text-center">
        <h1
          className="text-2xl md:text-3xl font-semibold mt-14"
          style={{ fontFamily: "revert-layer" }}
        >
          Ride the Wave of Weather innovation
        </h1>
        <p className="mt-5 text-lg text-gray-600">
          Experience weather forecasting like never before
        </p>

        <Link href="/weather" passHref>
          <button className="cursor-pointer bg-black text-white rounded-md px-4 py-3 mt-5">
            Start forecasting
          </button>
        </Link>
      </section>

      {/* Feature section */}
      <section className="h-min flex flex-col items-center justify-center w-full pb-10">
        <div>
          <h1
            className="text-xl md:text-2xl font-semibold mb-10"
            style={{ fontFamily: "inherit" }}
          >
            Key Features
          </h1>
        </div>

        <div className="w-full max-w-6xl">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <li>
              <div className="flex flex-col border border-gray-200 rounded-lg shadow bg-white px-4 py-4 h-full">
                <div className="svgContainer mb-1">
                  <Clock4 size={25} strokeWidth={3} />
                </div>

                <div className="textContainer">
                  <h1
                    className="text-lg md:text-xl font-semibold"
                    style={{ fontFamily: "inherit" }}
                  >
                    Real-time Update
                  </h1>
                  <p
                    className="text-gray-600 font-semibold mt-0.5"
                    style={{ fontFamily: "revert" }}
                  >
                    Instant weather information at your fingerprints
                  </p>
                </div>
              </div>
            </li>

            <li>
              <div className="flex flex-col border border-gray-200 rounded-lg shadow bg-white px-4 py-4 h-full">
                <div className="svgContainer mb-1">
                  <ChartLine size={25} strokeWidth={3} />
                </div>

                <div className="textContainer">
                  <h1
                    className="text-lg md:text-xl font-semibold"
                    style={{ fontFamily: "inherit" }}
                  >
                    Accurate Forecasts
                  </h1>
                  <p
                    className="text-gray-600 font-semibold mt-0.5"
                    style={{ fontFamily: "revert" }}
                  >
                    Precision-driven weather predictions
                  </p>
                </div>
              </div>
            </li>

            <li className="sm:col-span-2 lg:col-span-1">
              <div className="flex flex-col border border-gray-200 rounded-lg shadow bg-white px-4 py-4 h-full">
                <div className="svgContainer mb-1">
                  <Map size={25} strokeWidth={3} />
                </div>

                <div className="textContainer">
                  <h1
                    className="text-lg md:text-xl font-semibold"
                    style={{ fontFamily: "inherit" }}
                  >
                    Interactive Maps
                  </h1>
                  <p
                    className="text-gray-600 font-semibold mt-0.5"
                    style={{ fontFamily: "revert" }}
                  >
                    Detailed weather mapping system
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* People review */}
      <section className="h-min flex flex-col items-center justify-center w-full pb-10 mt-10 md:mt-16">
        <div>
          <h1
            className="text-xl md:text-2xl font-semibold mb-10"
            style={{ fontFamily: "inherit" }}
          >
            What Users Say
          </h1>
        </div>

        <div className="w-full max-w-6xl">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <li>
              <div className="flex flex-col border border-gray-200 rounded-lg shadow bg-white px-4 py-4 h-full">
                <div className="svgContainer mb-1 flex">
                  <div className="svgIcon">
                    <User size={40} strokeWidth={3} />
                  </div>

                  <div className="flex flex-col -top-1 relative">
                    <h2 className="ms-2 font-bold text-lg">Mikail</h2>
                    <p className="ms-2 font-semibold">Weather Enthusiast</p>
                  </div>
                </div>

                <div className="textContainer">
                  <h1
                    className="text-lg md:text-xl font-semibold"
                    style={{ fontFamily: "inherit" }}
                  >
                    The best web!
                  </h1>
                  <p
                    className="text-gray-600 font-semibold mt-0.5"
                    style={{ fontFamily: "revert" }}
                  >
                    This weather app is amazing. The forecasts are accurate and
                    the interface is easy to use.
                  </p>
                </div>
              </div>
            </li>

            <li>
              <div className="flex flex-col border border-gray-200 rounded-lg shadow bg-white px-4 py-4 h-full">
                <div className="svgContainer mb-1 flex">
                  <div className="svgIcon">
                    <User size={40} strokeWidth={3} />
                  </div>

                  <div className="flex flex-col -top-1 relative">
                    <h2 className="ms-2 font-bold text-lg">Iswinda</h2>
                    <p className="ms-2 font-semibold">Outdoor Guide</p>
                  </div>
                </div>

                <div className="textContainer">
                  <h1
                    className="text-lg md:text-xl font-semibold"
                    style={{ fontFamily: "inherit" }}
                  >
                    Weather monitoring!
                  </h1>
                  <p
                    className="text-gray-600 font-semibold mt-0.5"
                    style={{ fontFamily: "revert" }}
                  >
                    This app helps me plan my outdoor activities. The real-time
                    updates are invaluable.
                  </p>
                </div>
              </div>
            </li>

            <li className="sm:col-span-2 lg:col-span-1">
              <div className="flex flex-col border border-gray-200 rounded-lg shadow bg-white px-4 py-4 h-full">
                <div className="svgContainer mb-1 flex">
                  <div className="svgIcon">
                    <User size={40} strokeWidth={3} />
                  </div>

                  <div className="flex flex-col -top-1 relative">
                    <h2 className="ms-2 font-bold text-lg">Alex</h2>
                    <p className="ms-2 font-semibold">Daily User</p>
                  </div>
                </div>

                <div className="textContainer">
                  <h1
                    className="text-lg md:text-xl font-semibold"
                    style={{ fontFamily: "inherit" }}
                  >
                    Amazing app
                  </h1>
                  <p
                    className="text-gray-600 font-semibold mt-0.5"
                    style={{ fontFamily: "revert" }}
                  >
                    The interactive maps make weather tracking fun and
                    informative.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Team section */}
      <section className="h-min flex justify-center items-center flex-col">
        <div className="header mt-10 md:mt-20">
          <h1 className="text-xl md:text-3xl">Meet Our Team</h1>
        </div>

        <div className="teamPart text-center max-w-lg mx-auto px-4">
          <div className="imageContainer flex justify-center items-center mt-6">
            <Image
              src={Logo}
              alt="logo"
              width={120}
              className="rounded-full border border-gray-400 shadow-xl"
            />
          </div>

          <div className="">
            <h1 className="mt-5 font-semibold text-2xl md:text-3xl">Mikail</h1>
            <p className="mt-2">Founder & Lead developer</p>

            <p className="mt-4">
              Passionate about coding, kind-hearted, helpful, not toxic, 6.4
              feet tall, and nonchalant. I hope people who see this and support
              me will get a better life. God bless you all
            </p>
          </div>
        </div>
      </section>

      {/* Feature section */}
      <section className="featureSection h-min">
        <div className="featureContainer flex flex-col text-center w-full mt-10 md:mt-20 items-center">
          <div className="header mb-5">
            <h1 className="text-xl md:text-2xl font-semibold">
              All Features Are Free!
            </h1>
          </div>

          <div className="lower max-w-md mx-auto">
            <div className="svgContainer flex items-center justify-center">
              <Gift size={60} strokeWidth={0.8} />
            </div>

            <div className="textContainer">
              <h1 className="text-lg font-semibold mb-5">
                Access all premium features without any cost!
              </h1>

              <ul className="text-center space-y-3">
                <li className="flex justify-center">
                  <Check className="me-2" /> <p>Real-time updates</p>
                </li>

                <li className="flex justify-center">
                  <Check className="me-2" />
                  <p>Interactive Maps</p>
                </li>

                <li className="flex justify-center">
                  <Check className="me-2" /> <p>Accurate Forecasts</p>
                </li>
              </ul>

              <div className="startNowButton mt-8 mb-12">
                <Link href="/signIn" passHref>
                  <button className="text-white bg-black rounded-lg w-40 h-12 cursor-pointer">
                    Get Started Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
