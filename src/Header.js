import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Header(props) {
  return (
    <header>
        <Logo />
        <ThemeToggle
            handleChange={props.handleChange}
            theme={props.theme}
        />
    </header>
  );
}
