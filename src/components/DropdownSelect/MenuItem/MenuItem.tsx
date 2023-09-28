import styles from './styles.module.scss';

interface Props {
  title: string;
  onClick: () => void;
  isActive: boolean;
  isRadio?: boolean;
}

const MenuItem = ({ title, onClick, isActive, isRadio = false }: Props) => {
  return (
    <button onClick={onClick} type="button" className={styles.item}>
      <input
        type={isRadio ? 'radio' : 'checkbox'}
        checked={isActive}
        readOnly
        className={`${styles.item__input} ${
          isRadio ? styles.item__input_radio : styles.item__input_checkbox
        }`}
      />
      {!isRadio && <div className={styles.item__input_customCheckbox} />}
      <p
        className={`${styles.item__title} ${
          isActive ? styles.item__title_active : ''
        }`}
      >{`${title}`}</p>
    </button>
  );
};

export default MenuItem;
