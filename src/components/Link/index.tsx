import Styles from './styles.module.scss';

const Button = ({ name, url, actionText, logoImg, logoWidth = 128 }) => (
  <li className={Styles.container} id={name}>
    <div className={Styles.item}>
      <a
        href={url}
        target="_blank"
        ref="noopener noreferrer"
        className={Styles.anchor}
        service={name.toLowerCase()}
      >
        {logoImg && <img src={`/images/logos/${logoImg}`} height="32" width={logoWidth} />}
        {actionText && <div className={Styles.button}>{actionText}</div>}
      </a>
    </div>
  </li>
);

export default Button;
