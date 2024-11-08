import Image from "next/image";

import EpiAmOWhiteLogo from "@/assets/epiamo-white.png";
import fiocruzROLogo from "@/assets/fiocruz-ro.png";
import labioquimLogo from "@/assets/labioquim.png";
import unirWhiteLogo from "@/assets/unir-white.png";

import classes from "./Footer.module.css";

export function Footer() {
  return (
    <div className={classes.makers}>
      <Image alt="" className={classes.makerImage} src={labioquimLogo} />
      <Image alt="" className={classes.makerImage} src={fiocruzROLogo} />
      <Image alt="" className={classes.makerImageEpi} src={EpiAmOWhiteLogo} />
      <Image alt="" className={classes.makerImage} src={unirWhiteLogo} />
    </div>
  );
}
