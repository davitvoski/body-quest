import { useTranslation } from "react-i18next";
import "../../styles/Home.css";

/**
 * Inspired by https://dribbble.com/shots/16371194-Fitness-Landing-Page
 * Image used from: https://www.pngitem.com/middle/hiToJmi_fitness-png-transparent-background-fitness-png-png-download/
 * Image License: Personal Use Only
 * Show main content of home pgae
 * @returns HeaderLayout
 */
const HeaderLayout = () => {
  const { t } = useTranslation();
  return (
    <div className="outer">
      {/* left part of the main page, slogan of the webiste*/}
      <div className="slogan">
        <p id="make_your">{t("makeyour")}</p>
        <h1>{t("body_shape")}</h1>
        <p id="pSlogan">{t("slogan")}</p>
        {/* when click it will go to login/sign page */}
        <button id="startBtn" tabIndex={-1}>{t("start_now")} </button>
      </div>
      {/* rigth side fitness image */}
      <div className="inner">
        <img id="fitness" src="/fitness.png" alt="Man holding a dumbbell and woman stretching" />
      </div>
    </div>
  );
};

export default HeaderLayout;
