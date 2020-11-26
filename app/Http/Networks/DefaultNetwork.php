<?php

namespace App\Http\Networks;

class DefaultNetwork extends NetworkFactory {

    public function saveLead($unique_id) {
        $this->updateToLead($unique_id);
        return json_encode(['status' => true, 'msg' => 'https://www.google.com']);
    }

}