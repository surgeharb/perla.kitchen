import Styles from './styles.module.scss';

const Button = ({ name, url, actionText, logoImg }) => (
  <li className={Styles.container} id={name}>
    <div className={Styles.item}>
      <a
        href={url}
        target="_blank"
        ref="noopener noreferrer"
        className={Styles.anchor}
        service={name.toLowerCase()}
      >
        <img src={`/images/logos/${logoImg}`} height="32" />
        <div className={Styles.button}>{actionText}</div>
      </a>
    </div>
  </li>
);

export default Button;
