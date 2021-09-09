import style from "./style.module.css"

const Layout = ({ title, descr, urlBg, colorBg }) => {
    const layoutBg = { backgroundImage: urlBg && `url("${urlBg}")`, backgroundColor: colorBg };
    return (
        <section className={style.root} style={layoutBg}>
            <div className={style.wrapper}>
                <article>
                    {title &&
                        (
                            <div className={style.title}>
                                <h3>{title}</h3>
                                <span className={style.separator}></span>
                            </div>
                        )
                    }
                    {descr
                        &&
                        (
                            <div className={`${style.desc} ${style.full}`}>
                                <p>{descr}</p>
                            </div>
                        )
                    }
                </article>
            </div>
        </section>
    );
}

export default Layout;