import React from "react";
import styles from "./search.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/ReduxHooks";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import { dashboardActions } from "@store/dashboard";
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import { styleError, styleSuccess } from "../../../helpers/toastStyle";


const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const isSubmitting = useAppSelector((state) => state.dashboard.isSubmitting);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setLocation('');
    setEmail('');
    setIsOpen(false);
  }

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  }
  const handleSearchKeyEnter = (event: any) => {
    if (event.key === 'Enter') {
      handleSubmitSearch();
    }
  }
  const handleSubmitSearch = () => {
    dispatch(dashboardActions.updateIsLoading(true));
    axios
      .post(`${process.env.REACT_APP_API_URI}/v1/weather/current`, {
        location: search
      })
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message, styleError);
        }
        else {
          dispatch(dashboardActions.updateWeather(res.data.data));
        }
        dispatch(dashboardActions.updateIsLoading(false));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleLocationChange = (event: any) => {
    setLocation(event.target.value);
  }
  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  }
  const handleModalKeyEnter = (event: any) => {
    if (event.key === 'Enter') {
      handleSubmitModal();
    }
  }
  const handleSubmitModal = () => {
    dispatch(dashboardActions.updateIsSubmitting(true));
    axios
      .post(`${process.env.REACT_APP_API_URI}/v1/weather/subscribe`, {
        email: email,
        location: location
      })
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message, styleError);
        }
        else {
          closeModal();
          toast.success('You subscribed successfully', styleSuccess);
        }
        dispatch(dashboardActions.updateIsSubmitting(false));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={styles["search-container"]}>
      <div className={styles["search-header"]}>
        <h2>Enter a city name</h2>
      </div>
      <input onKeyDown={handleSearchKeyEnter} onChange={handleSearchChange} type="text" placeholder="E.g., New York, London, Tokyo" />
      <button onClick={handleSubmitSearch} className={styles["btn-search"]}>Search</button>
      <div className={styles["or-container"]}>
        <div className={styles["line"]}></div>
        <p>or</p>
        <div className={styles["line"]}></div>
      </div>
      <button onClick={()=>{setSearch('ho chi minh'); handleSubmitSearch();}}className={styles["btn-current-location"]}>Use current location</button>
      <button onClick={openModal} className={`${styles["btn-current-location"]} ${styles["btn-more-margin"]}`}>Receive daily forecast via email</button>
      <Modal show={modalIsOpen} onHide={closeModal} >
        <Modal.Header>
          <Modal.Title>
            <h1 className={styles["title-modal"]}>Email registration</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles["padding-modal"]}>
            <p className={styles["content-modal"]}>Please enter your information so we can send you daily weather updates that match your location and preferences</p>
            <p className={`${styles["content-modal"]} ${styles["more-vertical-space"]}`}>Email</p>
            <input className={styles["input-modal"]} onKeyDown={handleModalKeyEnter} onChange={handleEmailChange} type="text" placeholder="Enter your email" />
            <p className={`${styles["content-modal"]} ${styles["more-vertical-space"]}`}>Location</p>
            <input className={`${styles["input-modal"]} ${styles["more-vertical-input-space"]}`} onKeyDown={handleModalKeyEnter} onChange={handleLocationChange} type="text" placeholder="Enter your location" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className={styles["padding-modal"]}>
            <button onClick={closeModal} className={styles["btn-cancel"]}>Cancel</button>
            {isSubmitting ?
              <button className={styles["btn-loading"]}><BeatLoader
                color="white"
                margin={2}
                size={7}
                speedMultiplier={0.5}
              /> </button>
              : <button onClick={handleSubmitModal} className={styles["btn-submit"]}>Submit</button>}
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Search;
