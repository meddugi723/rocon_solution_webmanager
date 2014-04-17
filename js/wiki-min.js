(function(i){var n={},m=i.document,d="localStorage",b="script",h;n.disabled=false;n.set=function(e,p){};n.get=function(e){};n.remove=function(e){};n.clear=function(){};n.transact=function(e,r,p){var q=n.get(e);if(p==null){p=r;r=null}if(typeof q=="undefined"){q=r||{}}p(q);n.set(e,q)};n.getAll=function(){};n.forEach=function(){};n.serialize=function(e){return JSON.stringify(e)};n.deserialize=function(p){if(typeof p!="string"){return undefined}try{return JSON.parse(p)}catch(q){return p||undefined}};function c(){try{return(d in i&&i[d])}catch(e){return false}}if(c()){h=i[d];n.set=function(e,p){if(p===undefined){return n.remove(e)}h.setItem(e,n.serialize(p));return p};n.get=function(e){return n.deserialize(h.getItem(e))};n.remove=function(e){h.removeItem(e)};n.clear=function(){h.clear()};n.getAll=function(){var e={};n.forEach(function(p,q){e[p]=q});return e};n.forEach=function(q){for(var p=0;p<h.length;p++){var e=h.key(p);q(e,n.get(e))}}}else{if(m.documentElement.addBehavior){var l,g;
try
{
	g=new ActiveXObject("htmlfile");
	g.open();
	//g.write("<"+b+">document.w=window</"+b+'><iframe src="/favicon.ico"></iframe>');
	g.write("<"+b+">document.w=window</"+b+'>');
	g.close();
	l=g.w.frames[0].document;
	h=l.createElement("div")}catch(k){h=m.createElement("div");
	l=m.body}function a(e){return function(){var q=Array.prototype.slice.call(arguments,0);
	q.unshift(h);
	l.appendChild(h);
	h.addBehavior("#default#userData");
	h.load(d);
	var p=e.apply(n,q);
	l.removeChild(h);

	return p
}	}
	var f=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g");
	
function o(e)
{
	return e.replace(/^d/,"___$&").replace(f,"___")
}n.set=a(function(q,e,p){e=o(e);
	if(p===undefined){return n.remove(e)}q.setAttribute(e,n.serialize(p));
	q.save(d);
	return p});
	n.get=a(function(p,e){e=o(e);
	return n.deserialize(p.getAttribute(e))});
	n.remove=a(function(p,e){e=o(e);
	p.removeAttribute(e);
	p.save(d)});
	n.clear=a(function(r){var p=r.XMLDocument.documentElement.attributes;
	r.load(d);
	for(var q=0,e;e=p[q];q++){r.removeAttribute(e.name)}r.save(d)});
	n.getAll=function(p){var e={};n.forEach(function(q,r){e[q]=r});
	return e};
	n.forEach=a(function(s,r){var p=s.XMLDocument.documentElement.attributes;
	for(var q=0,e;e=p[q];++q){r(e.name,n.deserialize(s.getAttribute(e.name)))}})}}try{var j="__storejs__";
	n.set(j,j);
	if(n.get(j)!=j){n.disabled=true}n.remove(j)}catch(k){n.disabled=true}n.enabled=!n.disabled;
	if(typeof module!="undefined"&&module.exports){module.exports=n}else{if(typeof define==="function"&&define.amd){define(n)}else{i.store=n}}})(Function("return this")());
	(function(g){var b=function(l){if(l.indexOf("?")!==-1){return l.split("?")[0]}else{return l}};
	var f=g(".from-search-navigate");
	if(f.length){var d=g(".from-search-toc");
	var k=window._gaq||[];
	f.mozMenu({submenu:d,brickOnClick:true,onOpen:function(){k.push(["_trackEvent","Search doc navigator","Open on hover"])},onClose:function(){k.push(["_trackEvent","Search doc navigator","Close on blur"])}});
	d.find("ol").mozKeyboardNav()}var a={set:function(l,n,m){store.set(l,{val:n,exp:m*1000,time:new Date().getTime()})},get:function(l){var m=store.get(l);
	if(!m){return null}if(a.expired(m)){return null}return m.val},expired:function(l){return new Date().getTime()-l.time>l.exp},cleanup:function(){store.forEach(function(l,m){if(m&&a.expired(m)){store.remove(l)}})}};
	var i="mdn.search.";
	var c=history.state;
	var j=86400;
	var e=b(window.location.href);
	var h=g("body").data("docid");
	g.fn.mozSearchStore=function(l){var m=[];
	if(l===""){return this}a.cleanup();
	if(store.enabled){return this.each(function(){var q=g(this),p=q.attr("href"),s=q.text(),o=q.data("docid"),n=q.data("slug"),r=g("#search-q").val();
	m.push({title:s,docid:o,slug:n,url:p,query:r})}).promise().done(function(){var n={documents:m,next_page:null,previous_page:null};
	a.set(i+l,n,j)})}};
	g.fn.mozSearchResults=function(l,p){var m,n,o=a.get(i+l);
	if(l===""){return this}a.cleanup();
	if(o===null){if(window.location.search.indexOf("search=")!==-1){history.replaceState(c,window.document.title,e);
	p.push(["_trackEvent","Search doc navigator","Remove stale parameters on load","",h])}}else{g.each(o.documents,function(r,u){var t="?search="+l;
	var s=g("<a>",{text:u.title,href:u.url+t,on:{click:function(){p.push(["_trackEvent","Search doc navigator","Click",b(g(this).attr("href")),u.docid])}}});
	if(u.slug===g("body").data("slug")){if(typeof u.query!="undefined"){g("#main-q").val(u.query)}s.addClass("current");
	history.replaceState(c,window.document.title,u.url+t);
	m=o.documents[r+1];
	if(typeof m!="undefined"){g(".from-search-next").each(function(){g(this).attr("href",m.url+t).click(function(){p.push(["_trackEvent","Search doc navigator","Click next",m.url,m.docid])}).parent().show()})}n=o.documents[r-1];
	if(typeof n!="undefined"){g(".from-search-previous").each(function(){g(this).attr("href",n.url+t).click(function(){p.push(["_trackEvent","Search doc navigator","Click previous",n.url,n.docid])}).parent().addClass("from-search-spacer").show()})}}var q=g("<li></li>").append(s);g(".from-search-toc ol").append(q)})}return this};g(".search-results-topics").on("change","input",function(l){g("#search-form").submit();g(this).parents("fieldset").attr("disabled","disabled")})})(jQuery);(function(e,d,c){c(".toggleable").mozTogglers();(function(){var f=c("#quick-links");b(f.find("> ul > li, > ol > li"));f.find(".toggleable").mozTogglers();var h=c("#wiki-column-container");var g=c("#wiki-controls .quick-links");var j=c("#wiki-left").get(0);if(j){var i=j.parentNode}c("#quick-links-toggle, #show-quick-links").on("click",function(k){k.preventDefault();c(j).toggleClass("column-closed");h.toggleClass("wiki-left-closed");g.toggleClass("hidden");if(c(j).hasClass("column-closed")){i.removeChild(j)}else{i.appendChild(j)}})})();c(".subnav").each(function(){var l=c(this);var f=l.find(" > ol");var h=c(".zone-landing-header-preview-base").length?k:j;if(!f.length){return}b(f.find("li"));f.find(".toggleable").mozTogglers({slideCallback:h});var i=[];var g=f.find('a[href$="'+d.location.pathname+'"]');g.each(function(){var m=this;var n=c(this).parents(".toggleable").find(".toggler");n.each(function(){if(c.contains(c(this).parent("li").get(0),m)&&i.indexOf(this)===-1){c(this).trigger("mdn:click");i.push(this)}})}).parent().addClass("current");f.addClass("accordion");function j(){}function k(){if(c(".zone-landing-header-preview-base").css("position")=="absolute"){c(".wiki-main-content").css("min-height",l.height())}}h()});c(".page-watch a").on("click",function(f){f.preventDefault();c(this).closest("form").submit()});function b(f){f.each(function(){var h=c(this);var g=h.find("> ul, > ol");if(g.length){h.addClass("toggleable closed");h.find("> a").addClass("toggler").prepend('<i aria-hidden="true" class="icon-caret-up"></i>');g.addClass("toggle-container")}})}c("article pre").length&&(function(){var g=e.mdn.mediaPath;c("<link />").attr({type:"text/css",rel:"stylesheet",href:g+"css/syntax-prism-min.css"}).appendTo(d.head);var f=d.createElement("script");f.setAttribute("data-manual","");f.async="true";f.src=g+"js/syntax-prism-min.js";d.body.appendChild(f)})();(function(){var h=c("#toc");if(h.length){var g=h.offset().top;var i=h.find("> .toggler");var f="fixed";var k=c("#wiki-right");var j=a(function(n){var l=e.scrollY;var m=e.innerHeight-parseInt(h.css("padding-top"),10)-parseInt(h.css("padding-bottom"),10);if(l>g&&i.css("pointer-events")=="none"){h.css({width:h.css("width"),maxHeight:m});if(!h.hasClass(f)){h.addClass(f)}}else{h.css({width:"auto",maxHeight:"none"});h.removeClass(f)}if(!n||n.type=="resize"){if(i.css("pointer-events")=="auto"||i.find("i").css("display")!="none"){if(!h.attr("data-closed")){i.trigger("mdn:click")}}else{if(h.attr("data-closed")){i.trigger("mdn:click")}}}},10);j();c(e).on("scroll",j)}})();c(".htab").each(function(f){var g=c(this);var h=g.find(">ul>li");g.append(c("div[id=compat-desktop]")[f]);g.append(c("div[id=compat-mobile]")[f]);h.find("a").on("click mdn:click",function(j){var i=c(this);if(j){j.preventDefault();j.stopPropagation()}h.removeClass("selected");i.parent().addClass("selected");g.find(">div").hide().eq(h.index(i.parent())).show()}).eq(0).trigger("mdn:click")});c("body[contextmenu=edit-history-menu]").mozContextMenu(function(h,f){var g=f.find("menuitem");g.removeAttr("disabled");if(h.hostname&&h.hostname!==location.hostname){g.attr("disabled",true)}f.on("click",function(i){location.href=(h.href||location.href)+c(i.target).data("action")})});c(".stack-form").html('<form action="http://stackoverflow.com/search"><i class="stack-icon" aria-hidden="true"></i><label for="stack-search" class="offscreen">'+gettext("Search Stack Overflow")+'</label><input id="stack-search" placeholder="'+gettext("Search Stack Overflow")+'" /><button type="submit" class="offscreen">Submit Search</button></form>').find("form").on("submit",function(g){g.preventDefault();var f=c(this).find("#stack-search").val();if(f!=""){e.location="http://stackoverflow.com/search?q=[firefox]+or+[firefox-os]+or+[html5-apps]+"+f}});c.extend({parseQuerystring:function(i){var g={};var f=(i||window.location.search).replace("?","");var h=f.split("&");c.each(h,function(k,j){var l=j.split("=");g[l[0]]=l[1]});return g},slugifyString:function(h,g){var f=new RegExp("[?&\"'#*$"+(g?"":"/")+" +?]","g");return h.replace(f,"_").replace(/\$/g,"").replace(/\_+/g,"_")}});function a(g,i,f){var h;return function(){var m=this,l=arguments;var k=function(){h=null;if(!f){g.apply(m,l)}};var j=f&&!h;clearTimeout(h);h=setTimeout(k,i);if(j){g.apply(m,l)}}}})(window,document,jQuery);