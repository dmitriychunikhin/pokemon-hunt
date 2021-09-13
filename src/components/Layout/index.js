import style from "./style.module.css"
import cn from "classnames";

const Layout = ({ title, urlBg, colorBg, colorTitle, children }) => {
    const styleRoot = { backgroundImage: urlBg && `url("${urlBg}")`, backgroundColor: colorBg };
    const styleTitle = { color: colorTitle };
    return (
        <section className={style.root} style={styleRoot}>
            <div className={style.wrapper}>
                <article>
                    <div className={style.title}>
                        <h3 style={styleTitle}>{title}</h3>
                        <span className={style.separator}></span>
                    </div>

                    <div className={cn(style.desc, style.full)}>
                        {children}
                    </div>
                </article>
            </div>
        </section>
    );
}

export default Layout;