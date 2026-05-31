import re

NEW_PROJECTS = '''<!-- =========================================================
     PROJECTS
========================================================= -->
<section id="projects" class="section section-alt" aria-labelledby="h-proj">
  <div class="section-wrap">
    <div class="section-eyebrow reveal">Projects</div>
    <h2 id="h-proj" class="section-heading reveal">Things I\'ve built</h2>
    <p class="section-sub reveal">
      Four real projects — click any card to see the full breakdown.
    </p>

    <div class="acc-list" id="acc-list" role="list">

      <!-- PROJECT 01 — IPL Data Analysis -->
      <div class="acc-item reveal" id="acc-ipl" role="listitem">
        <button class="acc-trigger" id="acc-ipl-btn"
                aria-expanded="false" aria-controls="acc-ipl-body"
                onclick="toggleAcc(\'acc-ipl\')">
          <div class="acc-trigger-left">
            <span class="acc-num" aria-hidden="true">01</span>
            <div class="acc-summary">
              <div class="acc-cat">Data Analysis &nbsp;&middot;&nbsp; Python &nbsp;&middot;&nbsp; Jupyter</div>
              <h3 class="acc-title" id="acc-ipl-h">IPL Data Analysis</h3>
              <p class="acc-blurb">Explored multi-season IPL match &amp; delivery data to find which teams and players perform consistently &mdash; not just who wins the most.</p>
            </div>
          </div>
          <div class="acc-trigger-right">
            <div class="acc-tech-peek" aria-hidden="true">
              <span class="tag">Python</span><span class="tag">Pandas</span><span class="tag">Seaborn</span>
            </div>
            <div class="acc-chevron" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
        </button>
        <div class="acc-body" id="acc-ipl-body" role="region" aria-labelledby="acc-ipl-h">
          <div class="acc-body-inner">
            <div class="acc-content-grid">
              <div class="acc-details">
                <div class="acc-fact-group">
                  <div class="acc-fact-label"><span class="acc-fact-icon" aria-hidden="true">&#9888;</span> Problem Statement</div>
                  <p class="acc-fact-text">Raw IPL CSV data (matches + deliveries) has hundreds of columns and seasons of records. It tells you <em>what happened</em> in each ball, but gives no picture of performance trends &mdash; who consistently scores, which teams win in pressure chases, how toss decisions affect results.</p>
                </div>
                <div class="acc-fact-group">
                  <div class="acc-fact-label"><span class="acc-fact-icon" aria-hidden="true">&#10022;</span> Solution</div>
                  <p class="acc-fact-text">Loaded both datasets with Pandas, merged on match ID, cleaned null values and duplicate rows. Used <code>groupby</code> and aggregation to compute team win rates, top run-scorers across seasons, and bowling economy by phase. Visualized with Seaborn bar charts, horizontal rankings, and a correlation heatmap.</p>
                </div>
                <div class="acc-fact-group">
                  <div class="acc-fact-label"><span class="acc-fact-icon" aria-hidden="true">&#10072;</span> Features</div>
                  <ul class="acc-feature-list">
                    <li>Top 10 run scorers ranked by total runs (horizontal bar chart)</li>
                    <li>Team win distribution across all IPL seasons</li>
                    <li>Toss decision vs match result correlation heatmap</li>
                    <li>Season-by-season performance comparison</li>
                    <li>Bowling economy and wicket analysis by player</li>
                  </ul>
                </div>
                <div class="acc-fact-group">
                  <div class="acc-fact-label"><span class="acc-fact-icon" aria-hidden="true">&#9900;</span> Key Learning</div>
                  <p class="acc-fact-text">The hardest part of data analysis isn\'t writing the code &mdash; it\'s deciding <em>which question to ask</em>. <code>groupby</code> with <code>.agg()</code> is where most insight lives. A clean chart title matters more than chart type.</p>
                </div>
                <div class="acc-tools-row">
                  <span class="tag">Python 3</span><span class="tag">Pandas</span><span class="tag">NumPy</span><span class="tag">Matplotlib</span><span class="tag">Seaborn</span><span class="tag">Jupyter Notebook</span>
                </div>
                <div class="acc-action-row">
                  <a href="https://github.com/jithu748" target="_blank" rel="noopener noreferrer" class="acc-btn acc-btn-gh" id="ipl-github-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    View on GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/mudde-jitendra-babu-0b3403358/" target="_blank" rel="noopener noreferrer" class="acc-btn acc-btn-li" id="ipl-linkedin-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn Post
                  </a>
                </div>
              </div>
              <div class="acc-screenshot-col">
                <div class="acc-screenshot-frame">
                  <img src="./assets/project-ipl.png" alt="IPL Data Analysis Jupyter Notebook showing bar charts and heatmaps" class="acc-screenshot" loading="lazy" />
                  <div class="acc-screenshot-label" aria-hidden="true">Actual notebook output</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PROJECT 02 — Retail Analytics Dashboard -->
      <div class="acc-item reveal" id="acc-retail" role="listitem">
        <button class="acc-trigger" id="acc-retail-btn"
                aria-expanded="false" aria-controls="acc-retail-body"
                onclick="toggleAcc(\'acc-retail\')">
          <div class="acc-trigger-left">
            <span class="acc-num" aria-hidden="true">02</span>
            <div class="acc-summary">
              <div class="acc-cat">Analytics &nbsp;&middot;&nbsp; Power BI &nbsp;&middot;&nbsp; Python</div>
              <h3 class="acc-title" id="acc-retail-h">Retail Analytics Dashboard</h3>
              <p class="acc-blurb">Cleaned and visualized a retail sales dataset to show monthly trends, top categories, and regional breakdowns in a multi-panel dashboard.</p>
            </div>
          </div>
          <div class="acc-trigger-right">
            <div class="acc-tech-peek" aria-hidden="true">
              <span class="tag">Pandas</span><span class="tag">Power BI</span><span class="tag">Python</span>
            </div>
            <div class="acc-chevron" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
        </button>
        <div class="acc-body" id="acc-retail-body" role="region" aria-labelledby="acc-retail-h">
          <div class="acc-body-inner">
            <div class="acc-content-grid">
              <div class="acc-details">
                <div class="acc-fact-group">
                  <div class="acc-fact-label"><span class="acc-fact-icon" aria-hidden="true">&#9888;</span> Problem Statement</div>
                  <p class="acc-fact-text">A retail transaction dataset with rows of sales records across product categories, regions, and months. Raw, no clear story. No easy way to see what\'s selling, where growth is happening, or what seasonal patterns exist without processing it first.</p>
                </div>
                <div class="acc-fact-group">
                  <div class="acc-fact-label"><span class="acc-fact-icon" aria-hidden="true">&#10022;</span> Solution</div>
                  <p class="acc-fact-text">Cleaned data with Pandas &mdash; handled missing values, fixed date parsing, removed duplicates. Aggregated by category, region, and month using <code>resample</code> and <code>groupby</code>. Built multi-panel Matplotlib dashboard first, then moved to Power BI for interactive slicer-based filtering.</p>
                </div>
                <div class="acc-fact-group">
                  <div class="acc-fact-label"><span class="acc-fact-icon" aria-hidden="true">&#10072;</span> Features</div>
                  <ul class="acc-feature-list">
                    <li>Monthly revenue trend line chart with seasonal markers</li>
                    <li>Top product category performance bar chart</li>
                    <li>Regional sales distribution breakdown</li>
                    <li>Power BI slicers for interactive date and category filtering</li>
                    <li>Year-over-year comparison panel</li>
                  </ul>
                </div>
                <div class="acc-fact-group">
                  <div class="acc-fact-label"><span class="acc-fact-icon" aria-hidden="true">&#9900;</span> Key Learning</div>
                  <p class="acc-fact-text">Data cleaning was 60% of the work &mdash; a real surprise. Also learned that chart titles and axis labels are not optional: a technically correct chart with no context is useless to a non-technical viewer. Power BI slicers make dashboards actually usable, not just visual.</p>
                </div>
                <div class="acc-tools-row">
                  <span class="tag">Python 3</span><span class="tag">Pandas</span><span class="tag">Matplotlib</span><span class="tag">Power BI</span><span class="tag">Excel / CSV</span><span class="tag">Jupyter Notebook</span>
                </div>
                <div class="acc-action-row">
                  <a href="https://github.com/jithu748" target="_blank" rel="noopener noreferrer" class="acc-btn acc-btn-gh" id="retail-github-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    View on GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/mudde-jitendra-babu-0b3403358/" target="_blank" rel="noopener noreferrer" class="acc-btn acc-btn-li" id="retail-linkedin-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn Post
                  </a>
                </div>
              </div>
              <div class="acc-screenshot-col">
                <div class="acc-screenshot-frame">
                  <img src="./assets/project-retail.png" alt="Retail Analytics Dashboard showing sales trends and category charts" class="acc-screenshot" loading="lazy" />
                  <div class="acc-screenshot-label" aria-hidden="true">Dashboard output</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PROJECT 03 — Airline Delay Analysis -->
      <div class="acc-item reveal" id="acc-airline" role="listitem">
        <button class="acc-trigger" id="acc-airline-btn"
                aria-expanded="false" aria-controls="acc-airline-body"
                onclick="toggleAcc(\'acc-airline\')">
          <div class="acc-trigger-left">
            <span class="acc-num" aria-hidden="true">03</span>
            <div class="acc-summary">
              <div class="acc-cat">Data Analysis &nbsp;&middot;&nbsp; Python &nbsp;&middot;&nbsp; Large Dataset</div>
              <h3 class="acc-title" id="acc-airline-h">Airline Delay Analysis</h3>
              <p class="acc-blurb">Analyzed US airline delay data across carriers, airports, and time periods to identify which routes delay most and why.</p>
            </div>
          </div>
          <div class="acc-trigger-right">
            <div class="acc-tech-peek" aria-hidden="true">
              <span class="tag">Pandas</span><span class="tag">Seaborn</span><span class="tag">Matplotlib</span>
            </div>
            <div class="acc-chevron" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
        </button>
        <div class="acc-body" id="acc-airline-body" role="region" aria-labelledby="acc-airline-h">
          <div class="acc-body-inner">
            <div class="acc-content-grid">
              <div class="acc-details">
                <div class="acc-fact-group">
                  <div class="acc-fact-label"><span class="acc-fact-icon" aria-hidden="true">&#9888;</span> Problem Statement</div>
                  <p class="acc-fact-text">The US DOT airline delay dataset has hundreds of thousands of rows across multiple carriers, airports, routes, and seasons. It has delay cause breakdowns (carrier, weather, NAS, security) but no summary &mdash; impossible to spot patterns just by scrolling.</p>
                </div>
                <div class="acc-fact-group">
                  <div class="acc-fact-label"><span class="acc-fact-icon" aria-hidden="true">&#10022;</span> Solution</div>
                  <p class="acc-fact-text">Used Pandas with <code>chunksize</code> to read the large CSV without memory issues. Filtered by year, aggregated average delay by carrier and delay type. Built a heatmap of delays by day-of-week and hour-of-day, a stacked bar chart of delay causes, and a scatter plot of departure time vs. delay.</p>
                </div>
                <div class="acc-fact-group">
                  <div class="acc-fact-label"><span class="acc-fact-icon" aria-hidden="true">&#10072;</span> Features</div>
                  <ul class="acc-feature-list">
                    <li>Carrier-level average delay comparison (horizontal bar chart)</li>
                    <li>Delay cause breakdown &mdash; carrier vs weather vs NAS</li>
                    <li>Heatmap of delays by hour-of-day and day-of-week</li>
                    <li>Departure time scatter plot showing delay concentration</li>
                    <li>Airport-level filtering and aggregation</li>
                  </ul>
                </div>
                <div class="acc-fact-group">
                  <div class="acc-fact-label"><span class="acc-fact-icon" aria-hidden="true">&#9900;</span> Key Learning</div>
                  <p class="acc-fact-text">Reading large CSVs in chunks is essential when RAM is limited &mdash; loading the full file at once crashed the kernel. Learned how much better heatmaps are for time-based patterns compared to line charts. Not all charts suit all questions.</p>
                </div>
                <div class="acc-tools-row">
                  <span class="tag">Python 3</span><span class="tag">Pandas</span><span class="tag">NumPy</span><span class="tag">Seaborn</span><span class="tag">Matplotlib</span><span class="tag">Jupyter Notebook</span>
                </div>
                <div class="acc-action-row">
                  <a href="https://github.com/jithu748" target="_blank" rel="noopener noreferrer" class="acc-btn acc-btn-gh" id="airline-github-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    View on GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/mudde-jitendra-babu-0b3403358/" target="_blank" rel="noopener noreferrer" class="acc-btn acc-btn-li" id="airline-linkedin-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn Post
                  </a>
                </div>
              </div>
              <div class="acc-screenshot-col">
                <div class="acc-screenshot-frame">
                  <img src="./assets/project-airline.png" alt="Airline Delay Analysis showing heatmap and bar charts" class="acc-screenshot" loading="lazy" />
                  <div class="acc-screenshot-label" aria-hidden="true">Analysis output</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PROJECT 04 — Jarvis Virtual Assistant -->
      <div class="acc-item reveal" id="acc-jarvis" role="listitem">
        <button class="acc-trigger" id="acc-jarvis-btn"
                aria-expanded="false" aria-controls="acc-jarvis-body"
                onclick="toggleAcc(\'acc-jarvis\')">
          <div class="acc-trigger-left">
            <span class="acc-num" aria-hidden="true">04</span>
            <div class="acc-summary">
              <div class="acc-cat">Python &nbsp;&middot;&nbsp; Voice AI &nbsp;&middot;&nbsp; Automation</div>
              <h3 class="acc-title" id="acc-jarvis-h">Jarvis Virtual Assistant</h3>
              <p class="acc-blurb">A voice-controlled Python desktop assistant built to understand how speech recognition and TTS pipelines work from the ground up.</p>
            </div>
          </div>
          <div class="acc-trigger-right">
            <div class="acc-tech-peek" aria-hidden="true">
              <span class="tag">SpeechRecognition</span><span class="tag">pyttsx3</span><span class="tag">Python</span>
            </div>
            <div class="acc-chevron" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
        </button>
        <div class="acc-body" id="acc-jarvis-body" role="region" aria-labelledby="acc-jarvis-h">
          <div class="acc-body-inner">
            <div class="acc-content-grid">
              <div class="acc-details">
                <div class="acc-fact-group">
                  <div class="acc-fact-label"><span class="acc-fact-icon" aria-hidden="true">&#9888;</span> Problem Statement</div>
                  <p class="acc-fact-text">I used Siri and Google Assistant without understanding what was actually happening &mdash; how audio becomes text, how text becomes action, how the response is spoken back. I wanted to build this myself to understand the full pipeline, not just use the API.</p>
                </div>
                <div class="acc-fact-group">
                  <div class="acc-fact-label"><span class="acc-fact-icon" aria-hidden="true">&#10022;</span> Solution</div>
                  <p class="acc-fact-text">Built a Python program that captures microphone input using <code>SpeechRecognition</code>, transcribes it via Google Speech API, matches the text against a dictionary of command handlers, executes the action, and responds via <code>pyttsx3</code> text-to-speech. All running locally on desktop.</p>
                </div>
                <div class="acc-fact-group">
                  <div class="acc-fact-label"><span class="acc-fact-icon" aria-hidden="true">&#10072;</span> Features</div>
                  <ul class="acc-feature-list">
                    <li>Voice command capture via microphone using SpeechRecognition</li>
                    <li>Google Speech-to-Text for transcription</li>
                    <li>Text-to-speech responses using pyttsx3 (offline)</li>
                    <li>Wikipedia summary lookup by voice</li>
                    <li>YouTube music playback using pywhatkit</li>
                    <li>Time and date queries, greeting by time of day</li>
                    <li>Web browser automation for quick searches</li>
                  </ul>
                </div>
                <div class="acc-fact-group">
                  <div class="acc-fact-label"><span class="acc-fact-icon" aria-hidden="true">&#9900;</span> Key Learning</div>
                  <p class="acc-fact-text">Microphone sensitivity and ambient noise caused the most bugs &mdash; SpeechRecognition behaves very differently across environments. Learned to write long-running Python loops that stay responsive. Structuring the command dispatcher as a dictionary of functions (not a massive if-elif chain) made the code maintainable.</p>
                </div>
                <div class="acc-tools-row">
                  <span class="tag">Python 3</span><span class="tag">SpeechRecognition</span><span class="tag">pyttsx3</span><span class="tag">pywhatkit</span><span class="tag">Wikipedia API</span><span class="tag">webbrowser</span><span class="tag">datetime</span>
                </div>
                <div class="acc-action-row">
                  <a href="https://github.com/jithu748" target="_blank" rel="noopener noreferrer" class="acc-btn acc-btn-gh" id="jarvis-github-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    View on GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/mudde-jitendra-babu-0b3403358/" target="_blank" rel="noopener noreferrer" class="acc-btn acc-btn-li" id="jarvis-linkedin-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn Post
                  </a>
                </div>
              </div>
              <div class="acc-screenshot-col">
                <div class="acc-screenshot-frame">
                  <img src="./assets/project-jarvis.png" alt="Jarvis Virtual Assistant Python terminal showing voice command output" class="acc-screenshot" loading="lazy" />
                  <div class="acc-screenshot-label" aria-hidden="true">Running locally</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div><!-- /acc-list -->
  </div>
</section>

'''

content = open('d:/portfolio/index.html', 'r', encoding='utf-8').read()

START = '<!-- =========================================================\r\n     PROJECTS\r\n========================================================= -->'
END   = '<!-- =========================================================\r\n     CONTACT\r\n========================================================= -->'

si = content.find(START)
ei = content.find(END)

if si == -1 or ei == -1:
    # Try Unix line endings
    START = START.replace('\r\n', '\n')
    END   = END.replace('\r\n', '\n')
    si = content.find(START)
    ei = content.find(END)

print(f'Found at: {si} to {ei}')
new_content = content[:si] + NEW_PROJECTS + content[ei:]
open('d:/portfolio/index.html', 'w', encoding='utf-8').write(new_content)
print('Done. Lines:', new_content.count('\n'))
