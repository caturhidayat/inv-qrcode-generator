export default function AlertInput(props) {
  return (
    // <div className="badge badge-sm badge-error gap-1">
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     fill="none"
    //     viewBox="0 0 24 24"
    //     className="inline-block w-4 h-4 stroke-current"
    //   >
    //     <path
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       strokeWidth="2"
    //       d="M6 18L18 6M6 6l12 12"
    //     ></path>
    //   </svg>
    //   {props.message}
    // </div>
    <span className="text-red-500 text-xs">
      {props.message}
    </span>
  );
}
