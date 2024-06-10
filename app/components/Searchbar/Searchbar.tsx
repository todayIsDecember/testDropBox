'use client';

import { SearchbarProps } from "./SearchbarProps";
import SearchIcon from '../../../public/icons/search.svg';
import StarFilledIcon from '../../../public/icons/star_filled.svg';
import StarIcon from '../../../public/icons/star.svg';
import styles from './Searchbar.module.css';
import cn from 'classnames';
import { useEffect, useState, useRef } from "react";
import { Button } from "../Button/Button";
import { createPortal } from "react-dom";
import { Alert } from "..";

export const SearchBar = ({ coins, onSearch, className, ...props }: SearchbarProps): JSX.Element => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [filteredList, setFilteredList] = useState<string[]>(coins);
  const [activeBtn, setActiveBtn] = useState<string>('all coins');
  const [favourites, setFavourites] = useState<{ [key: string]: boolean }>({});
  const searchBarRef = useRef<HTMLLabelElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<string>('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onClickHandler = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
    setValue('');
  };

  const toggleFavourite = (coin: string) => {
    setFavourites(prevFavourites => ({
      ...prevFavourites,
      [coin]: !prevFavourites[coin]
    }));

    if (favourites[coin]) {
      setStatus('removed');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      setSelectedCoin(coin);
    } else {
      setStatus('added');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      setSelectedCoin(coin);
    }
  };

  useEffect(() => {
    if (value) {
      setFilteredList(coins.filter((coin) => coin.toLowerCase().includes(value.toLowerCase())));
    } else {
      setFilteredList(coins);
    }
  }, [value, coins]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target) &&
          dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsActive(false);
        setValue('');
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBarRef, dropdownRef]);

  const displayedList = activeBtn === 'all coins'
    ? filteredList.slice(0, 20)
    : Object.keys(favourites).filter((coin) => favourites[coin])
        .filter((coin) => coin.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 20);

  const dropdownContent = (
    <div className={cn(styles.listContainer, { [styles.activeListContainer]: isActive })} ref={dropdownRef}>
      <div className={styles.buttonsContainer}>
        <Button isActive={activeBtn === 'favourite'} onClick={() => setActiveBtn('favourite')}>
          <StarFilledIcon className={cn(styles.starIcon, { [styles.activeStarIcon]: activeBtn === 'favourite' })} />favourite
        </Button>
        <Button isActive={activeBtn === 'all coins'} onClick={() => setActiveBtn('all coins')}>all coins</Button>
      </div>
      <ul className={cn(styles.list)}>
        {displayedList.length > 0 ? displayedList.map((coin) => (
          <li key={coin} className={styles.listItem} onClick={() => toggleFavourite(coin)}>
            {favourites[coin] ? <StarFilledIcon /> : <StarIcon />}
            {coin}
          </li>
        )): <li className={styles.emptyList}>no such coin found</li>}
      </ul>
    </div>
  );

  const dropdownRoot = isClient ? document.getElementById('dropdown-root') : null;

  return (
    <label ref={searchBarRef} className={cn(className, styles.searchbar, { [styles.activeSearchbar]: isActive })}>
      <input
        type="text"
        className={cn(styles.input, { [styles.activeInput]: isActive })}
        placeholder="Search..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
        {...props}
      />
      <SearchIcon className={styles.icon} onClick={onClickHandler} />
      {isActive && dropdownRoot && createPortal(dropdownContent, dropdownRoot)}
      {showAlert && <Alert coin={selectedCoin} status={status}/>}
    </label>
  );
};