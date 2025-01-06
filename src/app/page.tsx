import Form from "next/form";
import { Button } from "@/components/ui/Button/button";

export default function Home() {
  return (
    <div className="w-full h-full pt-24 flex justify-center items-center">
      <div className="relative pl-60">
        <img
          src="/img/frontpage.png"
          alt="Frontpage"
          className="rounded-lg max-w-xl"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="bg-white p-6 -translate-x-60 rounded-md shadow-lg">
            <Form action="/stays/search">
              <div className="py-2">
                <label htmlFor="location" className="block">
                  Where
                </label>
                <input
                  name="location"
                  className="border py-2 px-4 w-64 rounded-md"
                />
              </div>
              <div className="py-2">
                <Button variant="green" className="w-full" size="lg">
                  Search
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
