const Footer = () => {

  return (
    <footer className="app-footer">
      <div className="tag-line">
        <a href="http://cloudbuilder.live/" 
          target="_blank" 
          rel="noreferrer">Cloud Builder Live - February 2022</a>
      </div>
      <div className="logos">
        <a href="https://pluralsight.com/"
          target="_blank" 
          rel="noreferrer">
          <img src="/logos.png" 
            alt="Pluralsight and A Cloud Guru Logos"
            className="h-full" />
        </a>
      </div>
    </footer>
  )

}

export default Footer;