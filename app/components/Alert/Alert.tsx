'use client';
import cn from 'classnames'
import styles from './Alert.module.css'

import { AlertProps } from "./AlertProps";

export const Alert = ({className, coin, status, ...props}: AlertProps): JSX.Element => {
  return (
    <div className={cn(className, styles.alert)} {...props}>
      {status === 'added'? <p className={styles.textAlert}>{`Coin ${coin} added to favourites`}</p> : <p className={styles.textAlert}>{`Coin ${coin} removed from favourites`}</p>}
    </div>
  )
}