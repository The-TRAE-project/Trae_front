import classnames from 'classnames';
import styles from './InformationClue.module.scss';
import BoxTail from '../svgs/BoxTail';

interface InformationClueProps {
  isError?: boolean;
  text: string;
}

export const InformationClue = ({ isError, text }: InformationClueProps) => {
  return (
    <div className={classnames(styles.clue, isError ? styles.clue_error : '')}>
      {text}
      <BoxTail className={styles.clue__tail} />
    </div>
  );
};
