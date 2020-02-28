import React from "react";

export default function unknownAvatar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="20mm"
      height="40mm"
      version="1.1"
      viewBox="0 0 200 400"
    >
      <defs>
        <linearGradient id="a">
          <stop offset="0" stopColor="#999" stopOpacity="1"></stop>
          <stop offset="1" stopColor="gray" stopOpacity="0"></stop>
        </linearGradient>
        <radialGradient
          id="b"
          cx="101.298"
          cy="97.429"
          r="99.786"
          fx="101.298"
          fy="97.429"
          gradientTransform="matrix(1.14393 -.0118 .02328 2.25747 -16.848 -121.318)"
          gradientUnits="userSpaceOnUse"
          xlinkHref="#a"
        ></radialGradient>
      </defs>
      <g
        fillOpacity="1"
        stroke="none"
        strokeDasharray="none"
        strokeDashoffset="0"
        strokeMiterlimit="4"
        strokeOpacity="1"
        strokeWidth="0.065"
        transform="translate(0 103)"
      >
        <rect
          width="199.571"
          height="397.631"
          x="1.512"
          y="-101.387"
          fill="#4d4d4d"
          opacity="0.99"
          ry="1.203"
        ></rect>
        <rect
          width="199.571"
          height="397.631"
          x="1.512"
          y="-101.387"
          fill="url(#b)"
          opacity="0.99"
          ry="1.203"
        ></rect>
      </g>
      <g>
        <g
          fill="#000"
          fillOpacity="1"
          stroke="none"
          strokeDasharray="none"
          strokeDashoffset="0"
          strokeMiterlimit="4"
          strokeOpacity="1"
          strokeWidth="3.36"
          transform="matrix(.28294 0 0 .31313 179.829 98.775)"
        >
          <path
            strokeWidth="0.825"
            d="M-1197.001 449.522c-169.046-5.931-261.169 188.095-295.03 376.917-.185 1.212.175-1.213 0 0 77.34-184.035 206.767-269.073 333.539-224.298 152.255 54.49-25.367 616.94 70.965 874.595 38.743-50.67-23.361-85.478 83.905-355.253l49.814-197.07c15.651-195.721 109.804-265.068 58.672-352.107-51.131-87.04-109.889-91.67-178.247-112.66-31.413-9.647-104.302-9.447-123.618-10.124z"
            opacity="0.99"
            transform="scale(.26458)"
          ></path>
          <path
            strokeWidth="0.218"
            d="M-279.162 415.23a9.85 9.655 0 01-11.645 7.442 9.85 9.655 0 01-7.64-11.385 9.85 9.655 0 0111.584-7.534 9.85 9.655 0 017.733 11.323"
            opacity="0.99"
          ></path>
        </g>
      </g>
    </svg>
  );
}
