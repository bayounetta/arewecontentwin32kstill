<h1 align="center">
  <a href="https://www.arewecontentprocesswin32kyet.com">Are We Content Process Win32K Ready Yet?</a>
</h1>

## about

Automated reporting for win32k usage in content processes served up every week and guided reporting churned out upon request

## prior art

Special thanks to the rest of the PlatSec team, MozMEAO, and RelEng for all your help!


BELOW THIS LINE THERE BE DRAGONS AND GARBAGE

check-spidermonkey
cppunittest
crashtest
firefox-ui-functional
firefox-ui-update
geckodriver,marionette
mochitest-1
mochitest-2
mochitest-3,mochitest-4
mochitest-5
mochitest-a11y
mochitest-browser
mochitest-browser-clipboard
mochitest-chrome
mochitest-chrome-clipboard
mochitest-chrome-gpu
mochitest-devtools
mochitest-media
mochitest-plain
mochitest-plain-clipboard
mochitest-plain-gpu,mochitest-screenshots
mochitest-webgl1-core,mochitest-webgl1-ext
mochitest-webgl2-core,mochitest-webgl2-deqp
mochitest-webgl2-ext
python
reftest
robocop
valgrind
web-platform-tests
web-platform-tests-reftest
web-platform-tests-testharness
web-platform-tests-wdspec
xpcshell






vomit at try with features
point server
run tests and logs

mach package tests
try server download

associate with builds

prototype to generate logs

Prereqs:
  programmatically set log output file name
  bugzilla rest api library
  treeherder rest api library
  taskcluster rest api library

Plans:
  watch for any bugs under the win32k-lockdown umbrella
  listen for new try pushes tagged with these bugs
  when new push is found fork process to:
    pull release build artifact
    pull corresponding source tree
    pull corresponding treeherder test command
    run tests under windbg
    process logs and deploy to site

Artifacts:
  target.zip - build output


pull a shallow copy of hg.m.o/try at revision
drop revision's target build into obj dir
??? it might work ???

stay slimy noodle boy
