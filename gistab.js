var Gistab = {
	_defaultAnchor: null,
	_createFrame: function($item) {
		$frame = document.createElement('div');
		$frame.className = 'gistab';
		$frame.innerHTML = "<div id='gistabmenu'></div><div id='gistabcontent'></div>";
    $item.insertBefore($frame, $item.firstChild);
		$description = document.querySelector("div[itemprop='about']");
		if( $description !== null) {
			$item.insertBefore($description, $item.firstChild);
		}

		return $frame;
	},
	_createTabs: function($content, anchor) {
		var title = $content.getElementsByTagName('strong')[0].innerText;
		var $titleTab = document.createElement('p');
		$titleTab.id = 'gistab-m-' + anchor;
		$titleTab.innerHTML = "<a href='#" + anchor + "'>" + title + "</a>"
		$titleTab.onclick = function(event) {
			window.location.hash = anchor;
			Gistab._displayOnly(anchor);
			return false;
		}
		document.getElementById('gistabmenu').appendChild($titleTab);
	},
	_createContents: function($content, anchor) {
		var $newContent = document.createElement('div');
		var newContentId = 'gistab-c-' + anchor;
		$newContent.id = newContentId;
		document.getElementById('gistabcontent').appendChild($newContent);
		document.getElementById(newContentId).appendChild($content);
	},
	_assemble: function($frame) {
		if( document.getElementById('gistabmenu') === null ||
				document.getElementById('gistabcontent') === null ) { return; }
		$files = document.getElementsByClassName('file');
		var self = this;
		Array.from($files).forEach(function($content, i) {
			var url = $content.getElementsByClassName('file-info')[0]
															 .getElementsByTagName('a')[0]
															 .getAttribute('href');
			var anchor = url.split('#')[1];
			self._defaultAnchor = (i === 0 ? anchor : self._defaultAnchor);
      self._createTabs($content, anchor);
			self._createContents($content, anchor)
		});
	},
  initialize: function() {
		var $item = document.getElementsByClassName('gist-content')[0];
		$frame = this._createFrame($item);
		this._assemble($frame);
		this._loadCss();
	},
	_loadCss: function() {
		$gistabmenu = document.getElementById('gistabmenu');
		$gistabmenu.style.margin = 0;
		$gistabmenu.style.padding = 0;
		$gistabmenu.style.listStyleType = 'none';
		$gistabmenu.style.zIndex = 999;

		$gistabmenu_p = document.getElementById('gistabmenu').getElementsByTagName('p');
		Array.from($gistabmenu_p).forEach(function($p) {
			$p.style.display = 'inline-block';
			$p.style.padding = 0;
			$p.style.margin = '3px';
		});

		$gistabmenu_a = document.getElementById('gistabmenu').getElementsByTagName('a');
		Array.from($gistabmenu_a).forEach(function($a) {
			$a.style.display = 'block';
			$a.style.borderLeft = '1px solid #d8d8d8';
			$a.style.borderTop = '1px solid #d8d8d8';
			$a.style.borderRight = '1px solid #d8d8d8';
			$a.style.borderTopLeftRadius = '3px';
			$a.style.borderTopRightRadius = '3px';
			$a.style.padding = '12px';
			$a.style.textDecoration = 'none';
			$a.style.background = '#f7f7f7';
			$a.style.borderTop = '1px solid #d8d8d8';
			$a.style.marginTop = '12px';
		});

		$files = document.getElementById('gistabcontent').getElementsByClassName('file');
		Array.from($files).forEach(function($file) {
			$file.style.marginTop = '-3px';
		});

		// initial display
		var urlAnchor = window.location.hash.substr(1);
		var extractedAnchor = /.+[^\-L\d]/.exec(urlAnchor);
		var anchor = (window.location.hash.substr(1) === '') ? this._defaultAnchor : extractedAnchor;
		this._displayOnly(anchor);
	},
	_displayOnly: function(anchor) {
		$contents = document.getElementById('gistabcontent').children;
		Array.from($contents).forEach(function($content) {
			$content.style.display = 'none';
		});

		$defaultFile = document.getElementById('gistab-c-' + anchor);
		$defaultFile.style.display = 'block';
	}
};

window.addEventListener('load', function() {
	Gistab.initialize();
})
