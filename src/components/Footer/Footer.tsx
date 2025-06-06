'use client';

import React from "react";
import { FooterStyle } from "@/styles/components_styles/footer/styled";
import { Span } from "@/styles/components_styles/mainStyle/styled";
import loveinsta from "public/img/loveinsta.png";
import lovetok from "public/img/lovetok.png";
import Image from "next/image";

const Footer: React.FC = () => {
    return <>
        <FooterStyle>
                    <section className="container">
                        <section>
                            <p>Love<Span>Verse</Span> - <span style={{fontWeight: '300'}}>Feito com amor</span></p>
                        </section>
                        <section className='social-medias'>
                            <a target="_blank" href="https://www.instagram.com/loveversespace/">
                                <Image
                                    src={loveinsta}
                                    alt="Logo do LoveVerse instagram"
                                    width={50}
                                    height={50}
                                    placeholder="blur"
                                    quality={100}
                                />
                            </a>
                            <a target="_blank" href="https://www.tiktok.com/@loveverse.space?is_from_webapp=1&sender_device=pc">
                                <Image
                                    src={lovetok}
                                    alt="Logo do LoveVerse tiktok"
                                    width={50}
                                    height={50}
                                    placeholder="blur"
                                    quality={100}
                                />
                            </a>
                        </section>
                    </section>
        </FooterStyle>
    </>
}

export default Footer;