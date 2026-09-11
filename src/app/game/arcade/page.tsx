import { redirect } from "next/navigation";

/** Old arcade path — play lives at /arcade. */
export default function GameArcadeRedirect() {
  redirect("/arcade");
}
