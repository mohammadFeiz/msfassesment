import { FC, useEffect, useRef, useState } from "react";
import Card from "../card";
import json from "./../../../public/data.json";
import { I_card } from "@/types";
import styled from "styled-components";

const SliderOuter = styled.div`
  position: relative;
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
`;

const SliderInner = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  border: 1px solid #444;
  border-radius: 12px;
`;

const SliderCardContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "selectedIndex" && prop !== "index"
}) <{ selectedIndex: number; index: number }>`
    min-width: 100%;
    transition: transform 0.5s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: ${({ selectedIndex, index }) => `translateX(-${selectedIndex * 100}%)`};
  `;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.1;
  &:hover {
    opacity: 1;
  }
`;

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Slider: FC = () => {
    const [data] = useState<I_card[]>(json);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const timer = useRef<any>(0);
    useEffect(() => {
        setIsClient(true);
    }, []);
    useEffect(() => {
        update();
        return () => clearTimeout(timer.current);
    }, []);

    const update = () => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            setSelectedIndex((prevIndex) => (prevIndex + 1) % data.length);
            update();
        }, 3000);
    };

    const buttonClick = (dir: 1 | -1) => {
        clearTimeout(timer.current);
        update();
        setSelectedIndex((prevIndex) => {
            if (dir === 1) {
                return (prevIndex + 1) % data.length;
            } else {
                return (prevIndex - 1 + data.length) % data.length;
            }
        });
    };
    if (!isClient) {
        return null; 
    }
    return (
        <SliderOuter>
            <SliderInner>
                {data.map((item, index) => (
                    <SliderCardContainer key={index} selectedIndex={selectedIndex} index={index}>
                        <Card title={item.title} subtitle={item.subtitle} description={item.description} index={index} />
                    </SliderCardContainer>
                ))}
            </SliderInner>
            <PrevButton onClick={() => buttonClick(-1)}>
                <svg viewBox="0 0 24 24" style={{ height: 36, width: 36 }}>
                    <path fill="currentColor" d="M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M15.4,16.6L10.8,12L15.4,7.4L14,6L8,12L14,18L15.4,16.6Z"></path>
                </svg>
            </PrevButton>
            <NextButton onClick={() => buttonClick(1)}>
                <svg viewBox="0 0 24 24" style={{ height: 36, width: 36 }}>
                    <path fill="currentColor" d="M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,18L16,12L10,6L8.6,7.4L13.2,12L8.6,16.6L10,18Z"></path>
                </svg>
            </NextButton>
        </SliderOuter>
    );
};

export default Slider;