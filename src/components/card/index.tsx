import { FC, useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
const CardContainer = styled.div`
    width:246px;
    height:480px;
    background:#000;
    border-radius:12px;
    padding:1.4rem;
    display:flex;
    flex-direction: column;
    justify-content: flex-end;
    gap:0.8rem;
    font-size:12px;
    flex-shrink: 0;
    position: relative;
`
const CardTitle = styled.div`
    font-size:1.6rem;
    font-weight:bold;
    z-index: 10;
`
const CardSubTitle = styled.div`
    font-size:1.2rem;
    color:#bbb;
    z-index: 10;
`
const CardDescription = styled.div`
    font-size:0.8rem;
    opacity:0.6;
    color:#aaa;
    z-index: 10;
`
const CardButton = styled.button`
    border:1px solid #ddd;
    border-radius:24px;
    height:2rem;
    z-index: 10;
    width:fit-content;
    padding:0 1rem;
    font-size:1.0rem; 
`
const CardImage = styled(Image)`
    position: absolute;
    left:0;
    top:0;
    opacity:0.7;
`

const Card: FC<{ title: string, subtitle: string, description: string, index: number }> = ({ title, subtitle, description, index }) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    if (!isClient) {
        return null; 
    }
    return (
        <CardContainer>
            <CardImage
                src={`/images/${index + 1}.jpg`}
                alt="card alt image"
                width={246}
                height={480}
                priority
            />
            <CardTitle>{title}</CardTitle>
            <CardSubTitle>{subtitle}</CardSubTitle>
            <CardDescription>{description}</CardDescription>
            <CardButton>Start</CardButton>
        </CardContainer>
    )
}
export default Card