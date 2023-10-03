import React, { useState, useRef, useEffect } from 'react';

import html2canvas from 'html2canvas';
import download from 'downloadjs';

import { BsDownload, BsDice6 } from "react-icons/bs";

import './Traits.css';
import optionsData from './Traits.json';

const Traits = () => {
    const hats = optionsData.hats;
    const mouths = optionsData.mouths;
    const suits = optionsData.suits;
    const eyes = optionsData.eyes;
    const bodies = optionsData.bodys;
    const backs = optionsData.backs;
    const backgrounds = optionsData.backgrounds;

    const getRandomOption = (options) => {
        const randomIndex = Math.floor(Math.random() * options.length);
        return options[randomIndex];
    };

    const [selectedOptions, setSelectedOptions] = useState({
        background: getRandomOption(backgrounds),
        back: getRandomOption(backs),
        body: getRandomOption(bodies),
        eyes: getRandomOption(eyes),
        suit: getRandomOption(suits),
        mouth: getRandomOption(mouths),
        hat: getRandomOption(hats),
    });

    const imageRef = useRef(null);
    const [randomizeKey, setRandomizeKey] = useState('');

    useEffect(() => {
        loadImages().then(() => {
            renderSelectedImages(imageRef.current);
        });
    }, [selectedOptions]);

    const loadImages = () => {
        return new Promise((resolve, reject) => {
            const images = Object.values(selectedOptions)
                .filter((option) => option !== null && option.image)
                .map((option) => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.onload = () => resolve();
                        img.onerror = (error) => reject(error);
                        img.src = option.image;
                    });
                });

            Promise.all(images)
                .then(() => resolve())
                .catch((error) => reject(error));
        });
    };

    const handleOptionSelect = (category, option) => {
        setSelectedOptions((prevOptions) => ({
            ...prevOptions,
            [category]: option,
        }));
    };

    const renderSelectedImages = (canvas) => {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        Object.values(selectedOptions).forEach((option) => {
            if (option !== null && option.image) {
                const img = new Image();
                img.src = option.image;
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
        });
    };

    const handleDownloadImage = () => {
        const canvas = imageRef.current;

        html2canvas(canvas)
            .then((canvas) => {
                const dataUrl = canvas.toDataURL('image/png');
                download(dataUrl, 'PenguinCollective.png');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleRandomize = () => {
        setSelectedOptions({
            background: getRandomOption(backgrounds),
            back: getRandomOption(backs),
            body: getRandomOption(bodies),
            eyes: getRandomOption(eyes),
            suit: getRandomOption(suits),
            mouth: getRandomOption(mouths),
            hat: getRandomOption(hats),
        });
        setRandomizeKey(Math.random());
    };

    return (
        <div>
            <div className='MenuSection'>

                {/* <div className='MenuSectionInfo'>
                    <h3>.</h3>
                    <h2>.</h2>
                    <p>.</p>
            
                </div> */}

                <div className='MenuSectionJustify'>
                    <div className='MenuSectionLeft'>

                        {/* <div className='MenuList'>
                            <h2>Background</h2>
                            <select className='SelectNav'
                                value={selectedOptions.background ? selectedOptions.background.id : ''}
                                onChange={(e) =>
                                    handleOptionSelect('background', backgrounds.find((background) => background.id === e.target.value))
                                }
                            >
                                {backgrounds.map((background) => (
                                    <option key={background.id} value={background.id}>
                                        {background.name}
                                    </option>
                                ))}
                            </select>
                        </div> */}

                        <div className='MenuList'>
                            <h2>Back</h2>
                            <select className='SelectNav'
                                value={selectedOptions.back ? selectedOptions.back.id : ''}
                                onChange={(e) =>
                                    handleOptionSelect('back', backs.find((back) => back.id === e.target.value))
                                }
                            >
                                {backs.map((back) => (
                                    <option key={back.id} value={back.id}>
                                        {back.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='MenuList'>
                            <h2>Body</h2>
                            <select className='SelectNav'
                                value={selectedOptions.body ? selectedOptions.body.id : ''}
                                onChange={(e) =>
                                    handleOptionSelect('body', bodies.find((body) => body.id === e.target.value))
                                }
                            >
                                {bodies.map((body) => (
                                    <option key={body.id} value={body.id}>
                                        {body.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='MenuList'>
                            <h2>Eyes</h2>
                            <select className='SelectNav'
                                value={selectedOptions.eyes ? selectedOptions.eyes.id : ''}
                                onChange={(e) =>
                                    handleOptionSelect('eyes', eyes.find((eye) => eye.id === e.target.value))
                                }
                            >
                                {eyes.map((eye) => (
                                    <option key={eye.id} value={eye.id}>
                                        {eye.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='MenuList'>
                            <h2>Suits</h2>
                            <select className='SelectNav'
                                value={selectedOptions.suit ? selectedOptions.suit.id : ''}
                                onChange={(e) =>
                                    handleOptionSelect('suit', suits.find((suit) => suit.id === e.target.value))
                                }
                            >
                                {suits.map((suit) => (
                                    <option key={suit.id} value={suit.id}>
                                        {suit.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='MenuList'>
                            <h2>Mouth</h2>
                            <select className='SelectNav'
                                value={selectedOptions.mouth ? selectedOptions.mouth.id : ''}
                                onChange={(e) =>
                                    handleOptionSelect('mouth', mouths.find((mouth) => mouth.id === e.target.value))
                                }
                            >
                                {mouths.map((mouth) => (
                                    <option key={mouth.id} value={mouth.id}>
                                        {mouth.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='MenuList'>
                            <h2>Hat</h2>
                            <select className='SelectNav'
                                value={selectedOptions.hat ? selectedOptions.hat.id : ''}
                                onChange={(e) =>
                                    handleOptionSelect('hat', hats.find((hat) => hat.id === e.target.value))
                                }
                            >
                                {hats.map((hat) => (
                                    <option key={hat.id} value={hat.id}>
                                        {hat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='DwImage'>
                            <button className='DiceBtn' onClick={handleRandomize}><BsDice6 style={{ verticalAlign: 'middle' }} size='1.3rem' /> Randomize</button>
                            <button className='DiceBtn' onClick={handleDownloadImage}><BsDownload style={{ verticalAlign: 'middle' }} size='1.2rem' /> Download</button>
                        </div>

                    </div>

                    <div className='MenuSectionRight'>
                        <canvas ref={imageRef} width={1200} height={1200} className='GeneratedImage' />
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Traits;