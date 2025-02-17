import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
  Form,
  Input,
} from "@heroui/react";
import { ChevronRightIcon } from "lucide-react";
import { useEffect } from "react";

export default function SignUp({ setUser, socket }) {
  useEffect(() => {
    const session = sessionStorage.getItem("user");
    if (session) {
      setUser(session);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    socket.emit("user", data.name);
    setUser(data.name);
    sessionStorage.setItem("user", data.name);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black p-6 overflow-hidden">
      <div className="absolute inset-[-350px] flex flex-wrap items-center justify-center transform -rotate-45 overflow-hidden whitespace-nowrap ">
        {[...Array(12)].map((_, row) => (
          <div key={row}
          className={`flex w-full overflow-hidden ${
            row % 2 === 0
              ? "animate-scroll-horizontal" // Even rows: left to right
              : "animate-scroll-horizontal-reverse" // Odd rows: right to left
          }`}>
            {[...Array(18)].map((_, col) => (
              <p key={col} className="text-[6rem] font-extrabold text-gray-600 opacity-20 select-none tracking-widest uppercase">
                YAPSTER
              </p>
            ))}
          </div>
        ))}
      </div>
      <Card className="relative w-full max-w-md rounded-lg bg-gray-900 text-white border border-gray-800 shadow-2xl shadow-blue-500/20">
  <CardHeader className="p-4">
    <div className="flex flex-row items-center justify-center gap-3">
      <Image
        alt="Yapster"
        height={50}
        radius="sm"
        src="favicon.ico"
        width={50}
        className="animate-pulse"
      />
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold text-white">Yapster</p>
        <p className="text-sm text-gray-400">A sleek chat experience</p>
      </div>
    </div>
  </CardHeader>

  <Divider className="border-gray-800" />

  <CardBody className="p-6">
    <Form onSubmit={onSubmit} validationBehavior="native" className="space-y-4">
      <Input
        isRequired
        errorMessage="Please enter a name"
        labelPlacement="outside"
        name="name"
        placeholder="Enter your name"
        type="text"
        autoComplete="off"
        className="bg-gray-800 text-white rounded-lg text-base font-medium transition-all"
      />
      <Button
        type="submit"
        className="w-full"
        color="primary" variant="ghost"
      >
        Join <ChevronRightIcon size={18} />
      </Button>
    </Form>
  </CardBody>

  <Divider className="border-gray-800" />

  <CardFooter className="p-4 text-center">
    <Link
      isExternal
      showAnchorIcon
      href="https://github.com/Animiiexe"
      className="text-blue-400 hover:text-blue-300 transition-all font-semibold"
    >
      Visit source code on GitHub
    </Link>
  </CardFooter>
</Card>
    </div>
  );
}
