import React, { useState, } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import "./GalleyStyle.css";
import GalleyQuestion from "./GalleyQuestion";
import Set from './Set';
import { createCardSet, asyncDeleteCards, sortCardsById } from './cardSlice';
import EditCardModal from './EditCardModal';

export default function SearchBar(props) {
    console.log('--- SearchBar ---');
    
 }