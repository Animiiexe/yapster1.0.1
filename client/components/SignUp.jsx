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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <Card className="w-full max-w-md shadow-lg rounded-2xl  bg-black
 text-white">
        <CardHeader className="flex items-center gap-4 p-6">
          <Image alt="Yapster" height={50} radius="sm" src="favicon.ico" width={50} className="animate-pulse" />
          <div className="flex flex-col">
            <p className="text-2xl font-semibold">Yapster</p>
            <p className="text-sm text-gray-400">A sleek chat experience</p>
          </div>
        </CardHeader>

        <Divider className="border-gray-700" />

        <CardBody className="p-6">
          <Form onSubmit={onSubmit} validationBehavior="native" className="space-y-4">
            <Input
              isRequired
              errorMessage="Please enter a name"
              
              labelPlacement="outside"
              name="name"
              placeholder="Enter your name"
              type="text"
              autoComplete="off" labelClassName="text-gray-400"
            />
            <Button type="submit" className="w-full bg-white hover:bg-blue-600 transition-all flex items-center justify-center gap-2 py-3 rounded-lg font-medium">
              Join <ChevronRightIcon size={18} />
            </Button>
          </Form>
        </CardBody>

        <Divider className="border-gray-700" />

        <CardFooter className="p-6 text-center">
          <Link isExternal showAnchorIcon href="https://discord.com/invite/lordxoxo" className="text-blue-400 hover:underline">
            Visit source code on GitHub
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
