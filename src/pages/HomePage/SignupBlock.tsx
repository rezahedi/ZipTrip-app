import React from "react";
import {Link} from "react-router-dom";
import {ChevronRightIcon} from "lucide-react";
import {useAuthModal} from "@/context/AuthModalContext";
import {useAuth} from "@/context/AuthContext";
import StartPrompt from "../dashboard/create/StartPrompt";

const SignupBlock = () => {
  const {user} = useAuth();
  const {openRegister} = useAuthModal();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleButtonClick = () => {
    if (!user) return openRegister();

    // Open StartPrompt
    setIsOpen(true);
  };

  return (
    <div className="flex my-10 max-h-[500px] rounded-4xl overflow-hidden">
      <img
        className="flex-2/6 object-cover w-full object-center hidden md:block"
        src="./images/chicago-signup-block.jpg"
      />
      <div className="flex-4/6 p-10 md:p-20 bg-primary/15 text-foreground flex flex-col gap-2 items-start justify-center">
        <h2 className="font-medium text-4xl md:text-6xl">Start Planning</h2>
        <h5 className="text-xl md:text-2xl mt-4">
          Join ZipTrip, make your own fantastic plan, share it with the world.
          And become your neighborhood favorite tour guide.
        </h5>
        <Link
          className="group rounded-full text-background bg-primary mt-8 md:mt-14 py-2 px-4 font-semibold text-lg flex items-center gap-1"
          to=""
          onClick={handleButtonClick}
        >
          Start a Plan{" "}
          <ChevronRightIcon className="size-6 -mr-1 w-0 transition-all duration-100 group-hover:w-6" />
        </Link>
      </div>
      {isOpen && (
        <StartPrompt isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default SignupBlock;
