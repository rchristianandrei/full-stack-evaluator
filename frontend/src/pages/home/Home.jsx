import { Header } from "../../components/Header";
import Tasks from "./Tasks";

export function Home() {
  return (
    <div className="app h-screen flex flex-col gap-3">
      <Header></Header>
      <Tasks className="flex-1" />
    </div>
  );
}
