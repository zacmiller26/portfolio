import React, { useMemo, useState } from 'react'

import Input from '../formComponents/Input'
import styles from './Calculator.module.sass'

function toFixed( value: number | string, dp: number ){
    return +parseFloat(value.toString()).toFixed( dp );
  }

const Calculator: React.FC<{}> = () => {

    return <div className={styles.root}>
        <GetPercentageOf />
        <hr />
        <XisPercentantOfWhat />
        <hr />
        <Multiply />
        <hr />
        <Division />
    </div>
    
}

const GetPercentageOf: React.FC<{}> = () => {

    const [x, setX] = useState('10')
    const [y, setY] = useState('200')

    const percentage = useMemo(() => {
        return (Number(x)/100 * Number(y))
    }, [x, y])

    const clearBtn = useMemo(() => (
        <button type="button" onClick={() => { setY(''); setX('') }}>
                Clear
        </button>
    ), [])

    return (
        <>
            <h2>
                <em data-alt>{x ? x : 'X'}%</em> of <em>{y ? y : 'Y'}</em>
                is <i>{percentage ? toFixed(percentage, 3) : 'Z'}</i>
            </h2>
            <Input
                placeholder="Percentage"
                name="x"
                id="x"
                value={x}
                onChange={e => setX(e.target.value)}
                inputClassName={styles.alt}
                type="number"
            />
            <Input
                placeholder="Number"
                name="y"
                id="y"
                onChange={e => setY(e.target.value)}
                value={y}
                type="number"
            />
            {clearBtn}
        </>
    )
}

const XisPercentantOfWhat: React.FC<{}> = () => {

    const [x, setX] = useState('56')
    const [y, setY] = useState('7')

    const total = useMemo(() => {
        return (x && y ? ((Number(x) * 100) / Number(y)).toFixed(2) : 0)
    }, [x, y])

    const clearBtn = useMemo(() => (
        <button type="button" onClick={() => { setY(''); setX('') }}>
                Clear
        </button>
    ), [])

    return (
        <>
            <h2>
                <em data-alt>{x ? x : 'X'}</em> is <em>{y ? y : 'Y'}%</em> of
                <i>{total ? toFixed(total, 3) : 'Z'}</i>
            </h2>
            <Input
                placeholder="Number"
                name="x"
                id="x"
                value={x}
                onChange={e => setX(e.target.value)}
                type="number"
                inputClassName={styles.alt}
            />
            <Input
                placeholder="Percentage"
                name="y"
                id="y"
                onChange={e => setY(e.target.value)}
                value={y}
                type="number"
            />
            {clearBtn}
        </>
    )
}

const Multiply: React.FC<{}> = () => {

    const [x, setX] = useState('56')
    const [y, setY] = useState('7')

    const total = useMemo(() => {
        return (x && y ? ((Number(x) * Number(y))) : 0)
    }, [x, y])

    const clearBtn = useMemo(() => (
        <button type="button" onClick={() => { setY(''); setX('') }}>
                Clear
        </button>
    ), [])

    return (
        <>
            <h2>
                <em data-alt>{x ? x : 'X'}</em> * <em>{y ? y : 'Y'}</em> is
                <i>{total ? toFixed(total, 3) : 'Z'}</i>
            </h2>
            <Input
                placeholder="X"
                name="x"
                id="x"
                value={x}
                onChange={e => setX(e.target.value)}
                type="number"
                inputClassName={styles.alt}
            />
            <Input
                placeholder="Y"
                name="y"
                id="y"
                onChange={e => setY(e.target.value)}
                value={y}
                type="number"
            />
            {clearBtn}
        </>
    )
}

const Division: React.FC<{}> = () => {

    const [x, setX] = useState('56')
    const [y, setY] = useState('7')

    const total = useMemo(() => {
        return (x && y ? ((Number(x) / Number(y))) : 0)
    }, [x, y])

    const clearBtn = useMemo(() => (
        <button type="button" onClick={() => { setY(''); setX('') }}>
                Clear
        </button>
    ), [])

    return (
        <>
            <h2>
                <em data-alt>{x ? x : 'X'}</em>/<em>{y ? y : 'Y'}</em> is
                <i>{total ? toFixed(total, 3) : 'Z'}</i>
            </h2>
            <Input
                placeholder="X"
                name="x"
                id="x"
                value={x}
                onChange={e => setX(e.target.value)}
                type="number"
                inputClassName={styles.alt}
            />
            <Input
                placeholder="Y"
                name="y"
                id="y"
                onChange={e => setY(e.target.value)}
                value={y}
                type="number"
            />
            {clearBtn}
        </>
    )
}

export default Calculator