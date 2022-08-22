import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Header(props) {
  return (
    <header>
        <Logo />
        <div>         
          <ThemeToggle
              handleChange={props.handleChange}
              theme={props.theme}
          />
          <a href="https://github.com/themaxboucher" target="_blank" rel="noopener noreferrer">
            Github
          </a>
        </div>
    </header>
  );
}
