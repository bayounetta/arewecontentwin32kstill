import React from 'react';

export default function Home() {
  return (
    <div className="Page">
      <p className="about">
        This project site tracks the changes week to week for win32k system call
        function usage in content processes with the ultimate goal of enabling{' '}
        <a href="https://docs.microsoft.com/en-us/windows/desktop/api/processthreadsapi/nf-processthreadsapi-updateprocthreadattribute">
          win32k lockdown
        </a>{' '}
        for{' '}
        <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1381019">
          enabling it in on content process startup
        </a>
      </p>
      <p className="about">
        All of the work here is based on Alex Gaynor's previous analysis and{' '}
        <a href="https://www.github.com/alex/win32k-stuff">win32k tools</a>
      </p>
      <p className="about">
        If you would like to help maintain this site or just look through the
        source code you can do so{' '}
        <a href="https://www.github.com/metalcanine/arewecontentwin32kyet">
          here.
        </a>{' '}
        The software for re-running the specified tasks under WinDbg to extract
        the logs can be found{' '}
        <a href="https://www.github.com/metalcanine/awcw32ky-client">here.</a>
      </p>
    </div>
  );
}
