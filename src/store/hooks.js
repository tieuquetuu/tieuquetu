// react
import {
    useCallback,
    useEffect,
    useMemo, useRef,
    useState
} from 'react'

// third party
import { useDispatch, useSelector } from "react-redux";

// application

export function useAppAction(action) {
    const dispatch = useDispatch()

    return useCallback((...args)=>(
        dispatch(action(...args))
    ), [])
}


export function useAppSelector(selector) {
    return useSelector(selector)
}

export function useMedia(query) {
    if (!process.browser) {
        return false;
    }

    const media = useMemo(() => window.matchMedia(query), [query])
    const [state, setState] = useState(media.matches)

    useEffect(() => {
        const onChangeMedia = () => {
            setState(media.matches)
        }

        if (media.addEventListener) {
            media.addEventListener('change', onChangeMedia)
        } else {
            // noinspection JSDeprecatedSymbols
            media.addListener(onChangeMedia);
        }

        return () => {
            if (media.removeEventListener) {
                media.removeEventListener('change', onChangeMedia);
            } else {
                // noinspection JSDeprecatedSymbols
                media.removeListener(onChangeMedia);
            }
        };
    }, [])

    return state
}

export function useAsyncAction(
    action,
    deps = []
) {
    const [loading, setLoading] = useState(false)

    const run = useMemo(() => (...args) => {
        if (loading) {
            return
        }

        setLoading(true)

        action(...args).then(() => {
            setLoading(false)
        })
    }, [loading, setLoading, ...deps])

    return useMemo(() => [run, loading], [run, loading])
}


export function useIsUnmountedRef() {
    const isUnmountedRef = useRef(false);

    useEffect(() => {
        isUnmountedRef.current = false;

        return () => {
            isUnmountedRef.current = true;
        };
    }, []);

    return isUnmountedRef;
}
