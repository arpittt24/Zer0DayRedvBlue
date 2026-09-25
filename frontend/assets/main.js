document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
  document.querySelectorAll('.live-widget').forEach(function (el) {
    var api = el.getAttribute('data-api');
    if (!api) { el.querySelector('.v').textContent = 'API UNREACHABLE'; return; }
    fetch(api + '/api/health', { method: 'GET', redirect: 'follow' })
      .then(function (r) { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then(function (body) {
        el.querySelector('.dot').classList.add('up');
        el.querySelector('.v').textContent = 'ALLSAFE-API ' + (body.build || 'ok');
      })
      .catch(function () {
        el.querySelector('.v').textContent = 'API UNREACHABLE';
      });
  });
  console.log('%cfsociety0.dat', 'color:#35e0a1');
  console.log('%cElliot Anderson is watching...', 'color:#35e0a1');
  console.log('%callsafe monitoring console online · zen relay synced · ZD{ironwatch_swift_07#s}', 'color:#35e0a1');
  console.log('%cindustry alert beacon degraded · reported ZD{umbra_watch_17%p}', 'color:#35e0a1');
});