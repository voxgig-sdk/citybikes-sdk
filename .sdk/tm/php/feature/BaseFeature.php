<?php
declare(strict_types=1);

// Citybikes SDK base feature

class CitybikesBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CitybikesContext $ctx, array $options): void {}
    public function PostConstruct(CitybikesContext $ctx): void {}
    public function PostConstructEntity(CitybikesContext $ctx): void {}
    public function SetData(CitybikesContext $ctx): void {}
    public function GetData(CitybikesContext $ctx): void {}
    public function GetMatch(CitybikesContext $ctx): void {}
    public function SetMatch(CitybikesContext $ctx): void {}
    public function PrePoint(CitybikesContext $ctx): void {}
    public function PreSpec(CitybikesContext $ctx): void {}
    public function PreRequest(CitybikesContext $ctx): void {}
    public function PreResponse(CitybikesContext $ctx): void {}
    public function PreResult(CitybikesContext $ctx): void {}
    public function PreDone(CitybikesContext $ctx): void {}
    public function PreUnexpected(CitybikesContext $ctx): void {}
}
