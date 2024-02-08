import { AppBar } from '@mui/material';
import _ from 'lodash';
import Link from 'next/link';

import styles from '../../styles/Header.module.css';
import { useEleSolPriceStore, useEleUsdcPriceStore } from '../stores/prices';

export function Header() {
    const eleSolPrice = useEleSolPriceStore((state) => state.price);
    const eleUsdcPrice = useEleUsdcPriceStore((state) => state.price);

    return (
        <>
            <AppBar position="static">
                <nav className={styles.Navigation}>
                    <div className={styles.Note}>
                        Custom RPC endpoint. Please use in fair way:{' '}
                        <strong>{process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT}</strong>
                    </div>
                    <div className={styles.Note}>
                        <Link href="https://github.com/nedrise27/elementerra-tools" target="_blank">
                            GitHub repository
                        </Link>
                    </div>
                    <div className={styles.NavItems}>
                        <Link href={'/'}>Home</Link>
                        <Link href={'/roi'}>Roi Tables</Link>
                        <Link href={'/elements'}>Elements</Link>
                    </div>
                </nav>
                <div className={styles.Header}>
                    {eleSolPrice && eleUsdcPrice ? (
                        <div className={styles.globalStats}>
                            <p>ELE/SOL: {_.round(eleSolPrice || 0, 8)} SOL</p>
                            <p>ELE/USDC: {_.round(eleUsdcPrice || 0, 8)} USDC</p>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </AppBar>
        </>
    );
}
